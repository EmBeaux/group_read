Rails.application.routes.draw do
  devise_for :users

  root 'groups#index'
  resources :groups
  resources :users

  namespace :api do
    namespace :v1 do
      resources :articles
      resources :users
      resources :groups
      resources :memberships
      resources :likes
    end
  end
end
