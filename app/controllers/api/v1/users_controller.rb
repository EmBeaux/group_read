require 'json/ext'
class Api::V1::UsersController < ApiController
  def index
    user = current_user
    groups = user.groups

    render json: current_user_info
  end

  def show
    @user = User.find(params[:id])

    render json: @user
  end

  def current_user_info
    current_user_info = current_user
    groups = []
    Group.all.each do |group|
      if current_user.groups.any? {|your_group| group.id == your_group.id}
        puts "found"
      else
        groups << group
      end
    end
    {id: current_user.id, email: current_user.email, featured_groups: [groups[1], groups[2], groups[3], groups[4], groups[5], groups[6]], groups: current_user.groups.order("created_at desc"), memberships: current_user.memberships, likes: current_user.likes, articles: current_user.articles, comments: current_user.comments}
  end
end
