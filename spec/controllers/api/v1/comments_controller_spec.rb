require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:another_group) { Group.create(name: "Another Group", interest: "group", description: "We are the other group")}
  let!(:a_user) {User.create(email: "wow@wow.com", password: "something")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: another_group.id)}
  let!(:a_comment) {Comment.create(user_id: a_user.id,article_id: first_article.id,comment: "Tom Brady Is an amazing quarter back", email: a_user.email)}

  describe "GET#index" do
    it "it returns all comments" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
    end
  end

  describe "GET#show" do
    it "it returns all comments that are owned by the group that has the id of params[id]" do
      get :show, params: {id: another_group.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
    end
  end

  describe "POST#create" do
    it "creates a new comment" do
      post_json = {user_id: a_user.id,article_id: first_article.id,comment: "Tom Brady Is an amazing quarter back", email: a_user.email}
      prev_count = Comment.count
      post(:create, params: post_json)
      expect(Comment.count).to eq(prev_count + 1)
    end

    it "returns the json of the new group" do
      post_json = {user_id: a_user.id,article_id: first_article.id,comment: "Tom Brady Is an amazing quarter back", email: a_user.email}
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["comment"]).to eq "Tom Brady Is an amazing quarter back"
    end
  end
end
