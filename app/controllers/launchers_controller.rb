class LaunchersController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:steam]

    def steam
        incomingData = request.env['omniauth.auth']
        user = User.find(current_user.id)
        user.steam_id =  incomingData[:uid]
        user.steam_name = incomingData['info'][:nickname]
        user.save

        redirect_to settings_path
    end

    def unlink
        unlink_from = params[:client]
        user = current_user
        user["#{unlink_from}_id"] = nil
        user["#{unlink_from}_name"] = nil

        if user.save
            redirect_to settings_path
        end
    end

end
