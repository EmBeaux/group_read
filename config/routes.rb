Rails.application.routes.draw do
  devise_for :users

  root 'groups#index'
  resources :groups

  resources :groups do
    get 'members', on: :member
  end
  resources :users

  namespace :api do
    namespace :v1 do
      resources :articles
      resources :users
      resources :groups
      resources :memberships
      resources :likes
      resources :comments

      resources :groups do
        get 'members', on: :member
      end
    end
  end
end
