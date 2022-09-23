class ApplicationController < ActionController::Base

    

    def current_user
        session[:userinfo].present? ? User.find_by(steam_id: session[:userinfo]['uid']) : nil
    end
    
end
