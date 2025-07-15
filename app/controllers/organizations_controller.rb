# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def index
    organizations = Organization.all.order(:name)
    render json: { organizations: organizations.as_json(only: [:id, :name]) }
  end
end
