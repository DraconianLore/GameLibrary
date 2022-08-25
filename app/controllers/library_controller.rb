class LibraryController < ApplicationController
    include Secured

    def index
        @user = User.find_by email: session[:userinfo]['user.email']
    end


end
