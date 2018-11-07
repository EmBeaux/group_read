require 'pry'
class ArticlesController < ApplicationController
  def new
    @article = Article.new
  end

  def create
    @aricle = Article.save(params[:title], params(:description), params[:url], params[:source], params[:image])

    if @article.save?

      redirect_to articles_path
    else

      render new_article_path
    end
  end

  def update
    # @bike = Bike.find(params[:id])
    # @bike.update(bike_params)
    # redirect_to bike_path(@bike)
  end

  def show

  end
end
