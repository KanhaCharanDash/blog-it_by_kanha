# frozen_string_literal: true

# app/controllers/categories_controller.rb
class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render json: @categories
  end
end
