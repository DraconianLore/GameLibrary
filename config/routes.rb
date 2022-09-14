Rails.application.routes.draw do

  # Defines the root path route ("/")
  root "sample#index"
  
  # React links
  get '/app' => 'library#index'
  get '/library' => 'library#index'
  get '/wishlist' => 'library#index'
  get '/settings' => 'settings#index'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


  get '/auth/auth0/callback' => 'auth0#callback'
  get '/auth/failure' => 'auth0#failure'
  get '/auth/logout' => 'auth0#logout'

  post '/auth/steam/callback' => 'launchers#steam'
  post '/unlink' => 'launchers#unlink'
end
