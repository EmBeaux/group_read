class Api::V1::GroupsController < ApiController
require 'pry'
skip_before_action :verify_authenticity_token
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

    json_object = {articles: @group.articles.order("created_at desc"), users: @group.users}

    render json: json_object
  end

  def index
    user = current_user
    @groups = Group.all

    render json: @groups
  end

  def new

  end

  def create
    group = Group.new(group_params)
    if group.save
      Membership.create(group_id: group.id, user_id: current_user.id)

      render json: group
    else

      render json: group.errors.full_messages
    end
  end

  def members
    @group = Group.find(params[:id])
    @users = @group.users

    render json: @users
  end

  private

  def group_params
    params.require(:group).permit(:name, :description, :interest)
  end
end
