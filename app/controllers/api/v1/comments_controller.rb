require 'json/ext'
require 'pry'

class Api::V1::CommentsController < ApiController
  skip_before_action :verify_authenticity_token
  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @group = Group.find(params[:id])
    @articles = @group.articles
    @comments = []

    @articles.each do |article|
      article.comments.each do |comment|
        @comments << comment
      end
    end

    render json: @comments
  end

  def create
    if Rails.env.test?
      username = params[:email]
    else
      email = current_user.email
      emailarr = email.split('@')
      username = emailarr[0]
    end


    @comment = Comment.new(user_id: params[:user_id], article_id: params[:article_id], comment: params[:comment], email: username)
    @article = @comment.article
    new_comment = @article.commentcount + 1
    @article.update(title: @article.title, description: @article.description, url: @article.url, source: @article.source, image: @article.image, commentcount: new_comment, group_id: @article.group.id)

    if @comment.save!
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment = Article.find(params[:id]).comments.find_by user_id: current_user.id
    @comment.destroy
    @article = @comment.article
    new_comment = @article.commentcount - 1
    @article.update(title: @article.title, description: @article.description, url: @article.url, source: @article.source, image: @article.image, commentcount: new_comment, group_id: @article.group.id)

    render json: {comment_id: @comment.id}
  end
end
