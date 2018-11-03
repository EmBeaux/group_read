class Api::V1::ArticlesController < ApiController
  def index
    if Group.find_by name: "TrendingFeeds"
      @group = Group.find_by name: "TrendingFeeds"
    else
      @group = Group.create(name: "TrendingFeeds", interest: "trending", description: "Trending Headlines!")
    end
    @url = 'https://newsapi.org/v2/top-headlines?' +
    "q=#{@group["interest"]}&" +
    'from=2018-10-30&' +
    'sortBy=popularity&' +
    "apiKey=#{ENV["NEWSAPI"]}";

    @articles = HTTParty.get(@url, :headers =>{'Content-Type' => 'application/json'} )
    @articles["articles"].each do |article|
      if Article.find_by title: article["title"]
        puts "Found"
      else
        if article["description"] == nil
          Article.create!(title: article["title"], description: "This is a filler description because none was given!", url: article["url"], source: article["source"]["name"], image: article["urlToImage"], group_id: @group.id)
        else
          Article.create!(title: article["title"], description: article["description"], url: article["url"], source: article["source"]["name"], image: article["urlToImage"], group_id: @group.id)
        end
      end
    end

    render json: @group.articles
  end
end
