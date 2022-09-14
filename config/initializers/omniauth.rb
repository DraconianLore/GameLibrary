
Rails.application.config.middleware.use OmniAuth::Builder do
    provider :steam, Rails.configuration.launchers[:steam_api_key]
end
