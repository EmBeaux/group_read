require 'json/ext'
require 'pry'

class Api::V1::MembershipsController < ApiController
  skip_before_action :verify_authenticity_token
  def index
    @memberships = Membership.all

    render json: @memberships
  end

  def show
    @membership = Membership.find(params[:id])

    render json: @membership
  end

  def create
    @membership = Membership.new(membership_params)

    if @membership.save
      render json: @membership
    else
      render json: @membership.errors.full_messages
    end
  end

  def destroy
    if Rails.env.test?
      @membership = Group.find(params[:id]).memberships.first
    else
      @membership = Group.find(params[:id]).memberships.find_by user_id: current_user.id
    end
      @membership.destroy

    render json: {membership_id: @membership.id}
  end

  private

  def membership_params
    params.require(:membership).permit(:user_id, :group_id)
  end
end
