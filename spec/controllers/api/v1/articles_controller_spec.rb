require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  let!(:trending_group) { Group.create(name: "TrendingFeeds", interest: "breaking", description: "We are the trending group")}
  let!(:first_article) { Article.create(title: "Title of first article", description: "Description of first article", url: "https://google.com", source: "Buzzfeed", image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg", group_id: trending_group.id)}

  describe "GET#index" do
    it "it returns the trending feed of articles" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
    end
  end
end
