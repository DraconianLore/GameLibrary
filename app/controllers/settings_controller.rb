class SettingsController < ApplicationController
    include Secured

    def index
        @user = current_user
    end

end
