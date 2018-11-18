require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

RSpec.describe Api::V1::LikesController, type: :controller do
  let!(:another_group) { Group.create(name: "Another Group", interest: "group", description: "We are the other group")}
  let!(:a_user) {User.create(email: "wow@wow.com", password: "something")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: another_group.id)}
  let!(:a_like) {Like.create(user_id: a_user.id, article_id: first_article.id)}
  before(:each) do
    login_as(a_user, scope: :user)
  end

  describe "POST#create" do
    it "creates a new like" do
      post_json = {like:{ article_id: first_article.id, user_id: a_user.id}}
      prev_count = Like.count
      post(:create, params: post_json)
      expect(Like.count).to eq(prev_count + 1)
    end

    it "returns the id of a new like" do
      post_json = {like:{ article_id: first_article.id, user_id: a_user.id}}
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["id"]).to be_kind_of(Integer)
    end
  end

  describe "DELETE" do
    before(:each) do
      delete :destroy, params: {id: first_article.id}
      @response = response
      @returned_json = JSON.parse(response.body)
    end

    it "deletes an existing like" do
      expect(first_article.likes.length).to eq 0
    end

    it "status 200 is returned" do
      expect(@response.status).to eq 200
    end

    it "returns deleted id" do
      expect(@returned_json["like_id"]).to eq a_like.id
    end
  end
end
