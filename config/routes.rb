# frozen_string_literal: true

Rails.application.routes.draw do
  # Serve JSON-only API routes
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show update], param: :slug do
      collection do
        get :my_posts
      end
    end

    resources :categories, only: [:index, :create]
    resources :organizations, only: [:index]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
  end

  # Fallback route for React frontend (SPA)
  root "home#index"
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
