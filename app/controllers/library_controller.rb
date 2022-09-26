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
        shared_games = match(user_games)
       
        render :json => {
            shared_games: shared_games.map { |k,v| [k,v]}
          }

    end

    def wishlist_match
        @user = current_user
        number_of_friends = params[:friend_ids].split(',').count
        wishlist_games = @user.wishlist_games.pluck(:appid)
        shared_games = match(wishlist_games)
        games_im_missing = []
        shared_games.each do |g|
            if g[1].count == number_of_friends
                games_im_missing.push(g[0])
            end
        end
        render :json => {
            shared_games: Game.where(appid: games_im_missing)
          }

    end

    private

    def match(games)
        shared_games = Hash.new
        games.each do |g|
            shared_games[g] = []
        end
        friends = params[:friend_ids].split(',')
        friends.each do |f|
            friend = Friend.find(f)
            friend.games.where(appid: games).each do |fg|
                shared_games[fg.appid].push(friend.id)
            end
        end
        return shared_games
    end

end
