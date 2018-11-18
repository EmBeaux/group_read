require 'rails_helper'
include Warden::Test::Helpers
Warden.test_mode!

RSpec.describe Api::V1::GroupsController, type: :controller do
  let!(:first_group) { Group.create(name: "First Group", interest: "Banana", description: "We are the first group")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: first_group.id)}
  let!(:a_user) {User.create(email: "wow@wow.com", password: "something")}
  let!(:membership) {Membership.create(user_id: a_user.id, group_id: first_group.id)}

  let!(:user) { FactoryBot.create(:user) }
  before(:each) do
    login_as(user, scope: :user)
  end

  describe "GET#show" do
    it "the group's news feed made up of a list of articles" do
      get :show, params: {id: first_group.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["articles"][0]["commentcount"]).to eq 0
      expect(returned_json["articles"][0]["likecount"]).to eq 0
      expect(returned_json["articles"].length).to eq 1
      expect(returned_json["users"].length).to eq 1
    end
  end

  describe "GET#index" do
    it "the current user's groups" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json[0]["name"]).to eq "#{first_group.name}"
      expect(returned_json[0]["interest"]).to eq "#{first_group.interest}"
      expect(returned_json[0]["description"]).to eq "#{first_group.description}"
    end
  end

  describe "POST#create" do
    it "creates a new group" do
      post_json = {group:{ name: "new group", interest: "interest", description: "description"}}
      prev_count = Group.count
      post(:create, params: post_json)
      expect(Group.count).to eq(prev_count + 1)
    end

    it "returns the json of the new group" do
      post_json = {group:{ name: "new group", interest: "interest", description: "description"}}
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["name"]).to eq "new group"
    end
  end
end
