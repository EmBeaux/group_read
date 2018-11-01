require 'spec_helper'
require_relative '../../app/models/group'

RSpec.describe Group, type: :model do
  it "is valid with valid attributes" do
    expect(Group.new(name: "This is a group name", interest: "This is an group interest", description: "description")).to be_valid
  end
  it "is not valid without a name" do
    group = Group.new(name: nil)
    expect(group).to_not be_valid
  end
  it "is not valid without a description" do
    group = Group.new(description: nil)
    expect(group).to_not be_valid
  end
  it "is not valid without a interest" do
    group = Group.new(interest: nil)
    expect(group).to_not be_valid
  end
end
