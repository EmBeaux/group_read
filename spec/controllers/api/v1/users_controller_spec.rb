require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:first_group) { Group.create(name: "First Group", interest: "Banana", description: "We are the first group")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: first_group.id)}
  let!(:a_user) { User.create(email: "wow@wow.com", password: "something")}
  let!(:membership) { Membership.create(user_id: a_user.id, group_id: first_group.id)}
  let!(:a_like) { Like.create(user_id: a_user.id, article_id: first_article.id)}
  let!(:a_comment) { Comment.create(user_id: a_user.id, article_id: first_article.id, comment: "This is a comment", email: a_user.email) }
  before(:each) do
    login_as(a_user, scope: :user)
  end


  describe "GET#show" do
    it "Get the user that matches the params id" do
      get :show, params: {id: a_user.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["groups"].length).to eq 1
      expect(returned_json["memberships"].length).to eq 1
      expect(returned_json["likes"].length).to eq 1
      expect(returned_json["comments"].length).to eq 1
    end
  end

  describe "GET#index" do
    it "get the current_user and all its groups, comments, likes, and memberships serialized on" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["id"]).to eq a_user.id - 1
      expect(returned_json["email"]).to eq a_user.email
    end
  end
end
