Rails.application.routes.draw do

  # Defines the root path route ("/")
  root "sample#index"
  
  # React links
  get '/app' => 'library#index'
  get '/friends' => 'library#index'
  get '/wishlist' => 'library#index'
  get '/settings' => 'settings#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/shared_games' => 'library#game_match'
  get '/check_wishlist' => 'library#wishlist_match'

  get '/auth/logout' => 'launchers#logout'

  post '/auth/steam/callback' => 'launchers#steam'
  post '/unlink' => 'launchers#unlink'
end
