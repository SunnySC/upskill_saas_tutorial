#Extending the devise functonality
class Users::RegistrationsController < Devise::RegistrationsController
  # Extend defualt Devise gem beahviour so that users 
  # users signing up with the Pro account (plan ID 2)
  # save iwth a special Stripe subscription function (resource.save_with_subscription)
  #Otherwise Devise signs up user as usual
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end