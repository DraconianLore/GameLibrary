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
        end
        return @user.friends
    end

    def create_friend(id)
        Friend.find_or_create_by(steam_id: id) do |f|
            if f.steam_name == nil || f.steam_name = 'Private Profile' || f.updated_at < 1.day.ago
                uri =  URI"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=#{@steam_key}&steamids=#{f.steam_id}"
                res = Net::HTTP.get_response(uri)
                if res.is_a?(Net::HTTPSuccess)
                    body = JSON.parse res.body
                    f.steam_name = body['response']['players'][0]['personaname']
                    f.avatar = body['response']['players'][0]['avatarmedium']
                    games = get_games(id) 
                    if games != 'Private'
                        f.games << games
                    end
                else
                    f.steam_name = 'Private Profile'
                end
            end 
        end
        @user.friends << Friend.find_by(steam_id: id)
    end

    def get_games(id)
        uri = URI("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=#{@steam_key}&steamid=#{id}&format=json&include_appinfo=true")
        res = Net::HTTP.get_response(uri)
        if res.is_a?(Net::HTTPSuccess)
            body = JSON.parse res.body
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
            return 'Private'
        end
    end

    def load_user_games
        if @user.updated_at < 1.day.ago || !@user.games.exists?
            @user.games = get_games(@user.steam_id)
            @user.updated_at = Time.now
            @user.save
            @user.games.each do |game|
                if game.updated_at < 1.day.ago || game.created_at > 2.minutes.ago
                    get_game_details(game)
                end
            end
        end
        return @user.games.order('last_played DESC NULLS last')
    end

    def load_user_wishlist
        if @user.updated_at < 2.hours.ago
            uri = URI("https://store.steampowered.com/wishlist/profiles/#{@user.steam_id}/wishlistdata")
            res = Net::HTTP.get_response(uri)
            if res.is_a?(Net::HTTPOK)
                body = JSON.parse res.body
                game_list = []
                body.to_a.each do |g|
                    game = Game.find_or_create_by(appid: g[0])
                    game.name = g[1]['name']
                    game.icon = g[1]['img_icon_url']
                    game.wishlist_order = g[1]['priority']
                    game.save
                    get_game_details(game)
                    game_list.push g[0]
                end
                @user.wishlist_games = Game.where(appid: game_list)
            end
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
                tag_array = body[game.appid]['data']['categories'].map { |tag| tag['description']}
                game.is_multiplayer = tag_array.include?('Multi-player') ? true : false
                game.is_coop = tag_array.include?('Co-op') ? true : false
                game.is_pvp = tag_array.include?('PvP') ? true : false
                game.description = body[game.appid]['data']['short_description']
                game.current_discount = body[game.appid]['data'].key?('price_overview') ? body[game.appid]['data']['price_overview']['discount_percent'] : 0
                game.runs_on_windows = body[game.appid]['data']['platforms']['windows']
                game.runs_on_mac = body[game.appid]['data']['platforms']['mac']
                game.runs_on_linux = body[game.appid]['data']['platforms']['linux']
                game.save
            end
        end
    end
end
