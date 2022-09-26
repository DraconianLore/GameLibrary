class LibraryController < ApplicationController
    include Secured
    include Api
    
    def index
        @user = current_user
        @friends = load_friends
        @games = load_user_games
        @wishlist = load_user_wishlist
    end

    def game_match
        @user = current_user
        user_games = @user.games.pluck(:appid)
        shared_games = Hash.new
        user_games.each do |g|
            shared_games[g] = []
        end
        friends = params[:friend_ids].split(',')
        friends.each do |f|
            friend = Friend.find(f)
            friend.games.where(appid: user_games).each do |fg|
                shared_games[fg.appid].push(friend.id)
            end
        end
       
        render :json => {
            shared_games: shared_games.map { |k,v| [k,v]}
          }

    end
end
