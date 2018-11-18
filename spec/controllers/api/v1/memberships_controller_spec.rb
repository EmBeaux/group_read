require 'rails_helper'

RSpec.describe Api::V1::MembershipsController, type: :controller do
  let!(:another_group) { Group.create(name: "Another Group", interest: "group", description: "We are the other group")}
  let!(:a_user) {User.create(email: "wow@wow.com", password: "something")}
  let!(:a_membership) {Membership.create(user_id: a_user.id, group_id: another_group.id)}

  describe "POST#create" do
    it "creates a new membership" do
      post_json = {membership:{ group_id: another_group.id, user_id: a_user.id}}
      prev_count = Membership.count
      post(:create, params: post_json)
      expect(Membership.count).to eq(prev_count + 1)
    end

    it "returns the id of a new membership" do
      post_json = {membership:{ group_id: another_group.id, user_id: a_user.id}}
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
      delete :destroy, params: {id: another_group.id}
    end

    it "deletes an existing membership" do
      expect(another_group.memberships.length).to eq 0
    end
  end
end
