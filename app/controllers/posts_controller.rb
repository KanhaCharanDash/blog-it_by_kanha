# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories).all
    render json: {
      posts: posts.as_json(include: { categories: { only: [:id, :name] } })
    }
  end

  def create
    post = Post.new(post_params)

    # Assign categories using category_ids
    if params[:category_ids].present?
      category_ids = params[:category_ids]
      post.categories = Category.where(id: category_ids)
    end

    if post.save
      render json: { notice: "Post was successfully created" }, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    post = Post.includes(:categories).find_by!(slug: params[:slug])
    render json: {
      post: post.as_json(include: { categories: { only: [:id, :name] } })
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
