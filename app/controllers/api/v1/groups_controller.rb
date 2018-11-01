class Api::V1::GroupsController < ApiController
require 'pry'
  def show
    if Group.find(params["id"])
      @group = Group.find(params["id"])
    else
      @group.articles = {error: "This page no longer exists"}
    end
    @url = 'https://newsapi.org/v2/everything?' +
    "q=#{@group["interest"]}&" +
    'from=2018-10-30&' +
    'sortBy=popularity&' +
    "apiKey=#{ENV["NEWSAPI"]}";

    @articles = HTTParty.get(@url, :headers =>{'Content-Type' => 'application/json'} )
    @articles["articles"].each do |article|
      if Article.find_by title: article["title"]
        puts "Found"
      else
        Article.create!(title: article["title"], description: article["description"], url: article["url"], source: article["source"]["name"], image: article["urlToImage"], group_id: params["id"])
      end
    end

    render json: @group.articles
  end

  def index
    user = current_user
    @groups = user.groups

    render json: @groups
  end
end
