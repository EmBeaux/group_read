require 'rails_helper'

RSpec.describe Api::V1::LikesController, type: :controller do
  let!(:another_group) { Group.create(name: "Another Group", interest: "group", description: "We are the other group")}
  let!(:a_user) {User.create(email: "wow@wow.com", password: "something")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: another_group.id)}
  let!(:a_like) {Like.create(user_id: a_user.id, article_id: first_article.id)}


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

  # describe "DELETE" do
  #   before(:each) do
  #     get :show, params: {id: a_like.id}
  #     returned_json = JSON.parse(response.body)
  #     binding.pry
  #     delete :destroy, params: {id: returned_json["id"]}
  #     get :show, params: {id: a_like.id}
  #     @deleted_returned_json = JSON.parse(response.body)
  #   end
  #
  #   it "deletes an existing review" do
  #     expect(@deleted_returned_json["reviews"].length).to eq 1
  #   end
  #
  #   it "gets the right status" do
  #     expect(response.status).to eq 200
  #   end
  # end
end
