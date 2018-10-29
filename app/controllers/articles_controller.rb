class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def new
    @article = Article.new
  end

  def create
    @aricle = Article.save(params[:title], params(:description), params[:url])

    if @article.save?

      redirect_to articles_path
    else

      render new_article_path
    end
  end

  def show
    @article = Article.find(params[:id])
  end
end
