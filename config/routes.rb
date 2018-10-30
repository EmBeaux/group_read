Rails.application.routes.draw do
  root 'articles#show'
  resources :articles

  namespace :api do
    namespace :v1 do
      resources :articles
    end
  end
end
