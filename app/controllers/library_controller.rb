class LibraryController < ApplicationController
    include Secured
    require 'uri'
    require 'net/http'

    def index
        @user = current_user
        @friends = load_friends
        
    end

    def load_friends
        steam_key = Rails.configuration.launchers[:steam_api_key]
        uri = URI("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=#{steam_key}&steamid=#{@user.steam_id}&relationship=friend")
        res = Net::HTTP.get_response(uri)
        firends = 'Not Public' unless res.is_a?(Net::HTTPSuccess)
        if res.is_a?(Net::HTTPSuccess)
            body = JSON.parse res.body
            friendList = body["friendslist"]["friends"].to_a
            puts '#################################'
            friendList.each do |f|
                puts f['steamid']
            end
            puts '#################################'
        end
        return firends
    end

end
