class LibraryController < ApplicationController
    include Secured
    include Api
    
    def index
        @user = current_user
        @friends = load_friends
        @games = load_user_games
    end

    

end
