require 'rails_helper'

RSpec.describe Api::V1::ArticlesController, type: :controller do
  let!(:trending_group) { Group.create(name: "TrendingFeeds", interest: "breaking", description: "We are the trending group")}

  describe "GET#index" do
    it "it returns the trending feed of articles" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to be > 0
    end
  end
end
