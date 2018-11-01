require 'rails_helper'
require_relative '../../app/models/user'


RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    expect(User.new(email: "matthew.bowler123@gmail.com", encrypted_password: "smith", password: "smithhhhhh")).to be_valid
  end
  it "is not valid without an title" do
    user = User.new(email: nil)
    expect(user).to_not be_valid
  end
  it "is not valid without a encrypted description" do
    user = User.new(encrypted_password: nil)
    expect(user).to_not be_valid
  end
end
