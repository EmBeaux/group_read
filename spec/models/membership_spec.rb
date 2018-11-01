require 'spec_helper'
require_relative '../../app/models/membership'

RSpec.describe Membership, type: :model do
  it "is valid with valid attributes" do
    user = User.create(email: "matthew.bowler123@gmail.com", encrypted_password: "smith", password: "smithhhhhh")
    group = Group.create(name: "Hello", interest: "hello", description: "bleh")
    expect(Membership.new(user_id: user.id, group_id: group.id)).to be_valid
  end
  it "is not valid without a group id" do
    membership = Membership.new(group_id: nil)
    expect(membership).to_not be_valid
  end
  it "is not valid without a user id" do
    membership = Membership.new(user_id: nil)
    expect(membership).to_not be_valid
  end
end
