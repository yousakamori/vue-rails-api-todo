# frozen_string_literal: true

Rails.application.routes.draw do
  root 'api/v1/todos#index'

  namespace :api do
    namespace :v1, format: :json do
      patch 'check_all', to: 'todos#check_all'
      delete 'delete_completed', to: 'todos#delete_completed'
      resources :todos, except: :show
    end
  end
end
