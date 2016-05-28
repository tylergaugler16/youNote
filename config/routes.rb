Rails.application.routes.draw do

  get 'sessions/new'

  root 'static_pages#home'

  get 'content_items/search'
  post 'content_items/search'
  get 'content_items/show'
  get 'users/public_notes'
  get     'help'      => 'static_pages#help'
  get     'signup'    => 'users#new'
  get     'login'     => 'sessions#new'
  post    'login'     => 'sessions#create'
  delete  'logout'    => 'sessions#destroy'

  resources :users
  resources :notes
  

 
end
