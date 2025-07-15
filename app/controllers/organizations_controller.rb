# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def index
    organizations = Organization.all.order(:name)
    render json: { organizations: organizations.as_json(only: [:id, :name]) }
  end
end
