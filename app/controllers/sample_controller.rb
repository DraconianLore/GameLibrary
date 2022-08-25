class SampleController < ApplicationController

    before_action :check_login

    private
    def check_login
        if session[:userinfo]
            redirect_to app_path
        end
    end
end
