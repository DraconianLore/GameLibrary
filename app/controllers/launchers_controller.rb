class LaunchersController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:steam]

    def steam
        incomingData = request.env['omniauth.auth']
        session[:userinfo] = {:uid => incomingData[:uid], :name => incomingData['info'][:nickname]}
        user = session[:userinfo]
        unless User.find_by steam_id: user[:uid]
            person = {name: user[:name], steam_id: user[:uid], updated_at: Time.now}
            User.create(person)
        end

        redirect_to '/app'
    end

    def unlink
        User.find(current_user.id).destroy
        reset_session
        redirect_to root_url
    end

    def logout
        reset_session
        redirect_to root_url
    end

end
