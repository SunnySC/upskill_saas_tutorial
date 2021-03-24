Rails.application.routes.draw do
    root to: 'pages#home'
    #Informing devise whether the user is a Basic or Pro
    devise_for :users, controllers: { registrations: 'users/registrations' }
    get 'about', to: 'pages#about'
    resources :contacts, only: :create
    get 'contact-us', to: 'contacts#new', as: 'new-contact'
end

