# ./app/controllers/concerns/secured.rb
module Secured
    extend ActiveSupport::Concern
  
    included do
      before_action :logged_in_using_steam?
    end
  
    def logged_in_using_steam?
      redirect_to '/' unless session[:userinfo].present?
    end
  end
  