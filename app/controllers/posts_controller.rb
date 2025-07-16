# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories, :user, :organization)
      .where(organization_id: current_user.organization_id)

    render json: {
      posts: posts.map do |post|
        post.as_json(
          only: [:id, :title, :description, :slug, :created_at],
          include: {
            categories: { only: [:id, :name] }
          }
        ).merge(
          author_name: post.user.name,
          organization_name: post.organization.name
        )
      end
    }
  end

  def create
    user = User.find(params[:user_id])
    organization = user.organization

    post = Post.new(post_params)
    post.user = user
    post.organization = organization

    if params[:category_ids].present?
      post.categories = Category.where(id: params[:category_ids])
    end

    if post.save
      render json: { notice: "Post was successfully created" }, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
   end

  def show
    post = Post.includes(:categories, :user, :organization).find_by!(slug: params[:slug])

    render json: {
      post: post.as_json(
        include: {
          categories: { only: [:id, :name] }
        }
      ).merge(
        author_name: post.user&.name,
        organization_name: post.organization&.name
      )
    }
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
