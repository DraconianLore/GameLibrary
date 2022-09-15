module Api
    extend ActiveSupport::Concern
    require 'uri'
    require 'net/http'


    def load_friends
        @steam_key = Rails.configuration.launchers[:steam_api_key]

        uri = URI("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=#{@steam_key}&steamid=#{@user.steam_id}&relationship=friend")
        res = Net::HTTP.get_response(uri)
        firends = 'Not Public' unless res.is_a?(Net::HTTPSuccess)
        if res.is_a?(Net::HTTPSuccess)
            body = JSON.parse res.body
            friendList = body["friendslist"]["friends"].to_a
            friendList.each do |f|
                create_friend(f['steamid'])
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
                    games = get_friend_games(id) 
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
        if @user.updated_at < 1.day.ago
            @user.games = get_games(@user.steam_id)
        end
        return @user.games.order('last_played DESC NULLS last')
    end
end
    