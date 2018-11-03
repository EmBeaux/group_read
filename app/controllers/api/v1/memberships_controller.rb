require 'json/ext'
class Api::V1::MembershipsController < ApiController
  skip_before_action :verify_authenticity_token
  def index
    @memberships = Membership.all

    render json: @memberships
  end

  def create
    @membership = Membership.new(membership_params)

    if @membership.save
      render json: @membership
    else
      render json: @membership.errors.full_messages
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:user_id, :group_id)
  end
end
