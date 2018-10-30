require 'pry'
class Api::V1::ArticlesController < ApiController
  def index
    @articles = Article.all
    render json: @articles
  end

  def create
    binding.pry
      article = Article.new()

    if article.save
      render json: article
    else

      render json: article.errors.full_messages
    end
  end
end
