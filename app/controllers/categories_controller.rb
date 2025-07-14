# frozen_string_literal: true

# app/controllers/categories_controller.rb
class CategoriesController < ApplicationController
  def index
    @categories = Category.order(:name)
    render json: @categories
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: { category: category }, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
