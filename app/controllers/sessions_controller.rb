# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    @user = User.find_by!(email: login_params[:email].downcase)

    unless @user.authenticate(login_params[:password])
      return render_error("Incorrect credentials, try again.", :unauthorized)
    end

    render json: {
      id: @user.id,
      name: @user.name,
      email: @user.email,
      authentication_token: @user.authentication_token,
      organization_id: @user.organization_id
    }, status: :ok
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
