class ApplicationController < ActionController::Base

    

    def current_user 
        session[:userinfo].present? ? User.find_by(email: session[:userinfo]['user.email']) : nil
    end
    
end
