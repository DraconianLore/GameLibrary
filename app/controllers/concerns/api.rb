module Api
    extend ActiveSupport::Concern
    require 'uri'
    require 'net/http'


    def load_friends
        @steam_key = ENV['STEAM_API_KEY']
        if @user.updated_at < 1.day.ago || !@user.friends.exists?
            uri = URI("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=#{@steam_key}&steamid=#{@user.steam_id}&relationship=friend")
            res = Net::HTTP.get_response(uri)
            if res.is_a?(Net::HTTPSuccess)
                friends = []
                body = JSON.parse res.body
                friendList = body["friendslist"]["friends"].to_a
                friendList.each do |f|
                    create_friend(f['steamid'])
                    friends.push(f['steamid'])
                end
                @user.friends = Friend.where(steam_id: friends)
            end
            @user.updated_at = Time.now
            @user.save
        end
        return @user.friends
    end

    def create_friend(id)
        f = Friend.find_or_create_by(steam_id: id)
        if f.steam_name == nil || f.steam_name = 'Private Profile' || f.updated_at < 1.day.ago || f.privacy == true
            uri =  URI"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=#{@steam_key}&steamids=#{f.steam_id}"
            res = Net::HTTP.get_response(uri)
            if res.is_a?(Net::HTTPSuccess)
                body = JSON.parse res.body
                f.steam_name = body['response']['players'][0]['personaname']
                f.avatar = body['response']['players'][0]['avatarmedium']
                games = get_games(id) 
                if games == 'Private'
                    f.privacy = true
                else
                    f.privacy = false
                    f.games = games
                end
            else
                f.steam_name = 'Private Profile'
            end
            f.updated_at = Time.now
            f.save
        end
        @user.friends << Friend.find_by(steam_id: id)
    end

    def get_games(id)
        uri = URI("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=#{@steam_key}&steamid=#{id}&format=json&include_appinfo=true")
        res = Net::HTTP.get_response(uri)
        Rails.logger.info "Steam API response for games: #{res.code} - Body length: #{res.body.length}"
        
        if res.is_a?(Net::HTTPSuccess)
            body = JSON.parse res.body
            Rails.logger.info "Steam API response body: #{body.inspect}"
            
            if body['response'] == {}
                return 'Private'
            end
            game_list = []
            body['response']['games'].to_a.each do |g|
                game = Game.find_or_create_by(appid: g['appid'])
                game.name = g['name']
                game.icon = g['img_icon_url']
                if id === @user.steam_id
                    game.last_played = g['rtime_last_played']
                end
                game.save
                game_list.push g['appid']
            end
            return Game.where(appid: game_list)
        else
            Rails.logger.warn "Steam API failed for games: #{res.code} - #{res.body}"
            return 'Private'
        end
    end

    def load_user_games
        # Always refresh if games data is older than 1 day
        if @user.games_updated_at < 1.day.ago
            Rails.logger.info "Refreshing user games - last updated: #{@user.games_updated_at}"
            
            @user.games = get_games(@user.steam_id)
            
            # Update game details for any games that haven't been updated recently
            @user.games.each do |game|
                if game.updated_at < 1.day.ago || game.created_at > 2.minutes.ago
                    get_game_details(game)
                end
            end
            
            # Update games timestamp after successful refresh
            @user.games_updated_at = Time.now
            @user.save
        else
            Rails.logger.info "Using cached user games - last updated: #{@user.games_updated_at}"
        end
        
        return @user.games.order('last_played DESC NULLS last')
    end

    def load_user_wishlist
        # Always refresh if wishlist data is older than 1 day OR if we have no wishlist games
        if @user.wishlist_updated_at < 1.day.ago || !@user.wishlist_games.exists?
            Rails.logger.info "Refreshing user wishlist - last updated: #{@user.wishlist_updated_at}, exists: #{@user.wishlist_games.exists?}"
            
            game_list = []
            
            # Use Steam Web API for wishlist data
            begin
                uri = URI("https://api.steampowered.com/IWishlistService/GetWishlist/v1/?key=#{@steam_key}&steamid=#{@user.steam_id}")
                res = Net::HTTP.get_response(uri)
                
                Rails.logger.info "Steam Wishlist API response: #{res.code} - Body length: #{res.body.length}"
                
                if res.is_a?(Net::HTTPSuccess) && !res.body.empty?
                    body = JSON.parse res.body
                    
                    if body['response'] && body['response']['items']
                        wishlist_items = body['response']['items']
                        Rails.logger.info "Successfully loaded #{wishlist_items.length} wishlist items from Steam API"
                        
                        wishlist_items.each do |item|
                            appid = item['appid'].to_s
                            game = Game.find_or_create_by(appid: appid)
                            game.wishlist_order = item['priority'] || 0
                            game.save
                            get_game_details(game)
                            game_list.push appid
                        end
                        
                        # Only update timestamp if we successfully loaded new data
                        if game_list.any?
                            @user.wishlist_games = Game.where(appid: game_list)
                            Rails.logger.info "Successfully loaded #{game_list.length} wishlist games"
                        end
                    else
                        Rails.logger.warn "Wishlist API response missing items data"
                    end
                else
                    Rails.logger.warn "Steam Wishlist API failed: #{res.code} - #{res.body}"
                end
                
            rescue => e
                Rails.logger.error "Error fetching wishlist from Steam API: #{e.message}"
                Rails.logger.error e.backtrace.first(5).join("\n")
            end
            
            if game_list.empty?
                Rails.logger.info "No wishlist games found - wishlist might be empty or API failed"
            end
            
            # Update wishlist timestamp after refresh attempt
            @user.wishlist_updated_at = Time.now
            @user.save
        else
            Rails.logger.info "Using cached user wishlist - last updated: #{@user.wishlist_updated_at}"
        end
        
        return @user.wishlist_games.order('current_discount DESC, wishlist_order ASC')
    end
    
    def get_game_details(game)
        uri = URI("https://store.steampowered.com/api/appdetails?appids=#{game.appid}")
        res = Net::HTTP.get_response(uri)
        if res.is_a?(Net::HTTPSuccess)
            body = JSON.parse res.body
            if body[game.appid]['success'] == false
                game.destroy!
            else
                # Add nil checks for all optional fields
                game_data = body[game.appid]['data']
                
                # Handle categories safely
                if game_data['categories']
                    tag_array = game_data['categories'].map { |tag| tag['description']}
                game.is_multiplayer = tag_array.include?('Multi-player') ? true : false
                game.is_coop = tag_array.include?('Co-op') ? true : false
                game.is_pvp = tag_array.include?('PvP') ? true : false
                else
                    game.is_multiplayer = false
                    game.is_coop = false
                    game.is_pvp = false
                end
                
                game.description = game_data['short_description'] || ''
                
                # Handle price overview safely
                if game_data['price_overview']
                    game.current_discount = game_data['price_overview']['discount_percent'] || 0
                else
                    game.current_discount = 0
                end
                
                # Handle platforms safely
                if game_data['platforms']
                    game.runs_on_windows = game_data['platforms']['windows'] || false
                    game.runs_on_mac = game_data['platforms']['mac'] || false
                    game.runs_on_linux = game_data['platforms']['linux'] || false
                else
                    game.runs_on_windows = false
                    game.runs_on_mac = false
                    game.runs_on_linux = false
                end
                
                game.save
            end
        end
    end
end
