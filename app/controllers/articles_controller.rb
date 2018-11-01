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

  def show

  end
end
