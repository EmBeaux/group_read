class GroupsController < ApplicationController
before_action :authenticate_user!
  def index
    user = current_user
    @groups = user.groups
  end

  def new
    @group = Group.new
  end

  def show
  end

  def create
    @group = Group.save(params[:title], params(:description), params[:url], params[:source], params[:image])

    if @group.save?

      redirect_to groups_path
    else

      render new_group_path
    end
  end

  def members

  end
end
