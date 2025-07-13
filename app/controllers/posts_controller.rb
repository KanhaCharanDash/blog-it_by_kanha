# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: { posts: @posts }
   end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice("Post was successfully created")
end

  def show
    post = Post.find_by!(slug: params[:slug])
    render_json({ post: post })
  end

  def post_params
    params.require(:post).permit(:title, :description)
  end
end
