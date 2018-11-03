require 'json/ext'
class Api::V1::UsersController < ApiController
  def index
    user = current_user
    groups = user.groups

    render json: user
  end
end
