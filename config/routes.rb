# frozen_string_literal: true

Rails.application.routes.draw do
  get "posts/index"
  resources :posts, only: [:index], param: :slug
  root "home#index"
  get "*path", to: "home#index", via: :all
end
