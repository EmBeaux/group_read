require 'json/ext'
require 'pry'

class Api::V1::LikesController < ApiController
  skip_before_action :verify_authenticity_token
  def index
    @likes = Like.all

    render json: @likes
  end

  def show
    @like = Like.find(params[:id])

    render json: @like
  end

  def create
    @like = Like.new(like_params)
    @article = @like.article
    new_like = @article.likecount + 1
    @article.update(title: @article.title, description: @article.description, url: @article.url, source: @article.source, image: @article.image, likecount: new_like, group_id: @article.group.id)
    if @like.save
      render json: @like
    else
      render json: @like.errors.full_messages
    end
  end

  def destroy
    @like = Article.find(params[:id]).likes.find_by user_id: current_user.id
    @like.destroy
    @article = @like.article
    new_like = @article.likecount - 1
    @article.update(title: @article.title, description: @article.description, url: @article.url, source: @article.source, image: @article.image, likecount: new_like, group_id: @article.group.id)

    render json: {like_id: @like.id}
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :article_id)
  end
end
