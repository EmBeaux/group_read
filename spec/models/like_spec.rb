require 'spec_helper'
require_relative '../../app/models/like'

RSpec.describe Like, type: :model do
  it "is valid with valid attributes" do
    group = Group.create(name: "Hello", interest: "hello", description: "bleh")
    user = User.create(email: "matthew.bowler123@gmail.com", encrypted_password: "smith", password: "smithhhhhh")
    article = Article.create!(title: "Hello", url: "hello", description: "bleh", source: "bleh", group_id: group.id)
    expect(Like.new(user_id: user.id, article_id: article.id)).to be_valid
  end
  it "is not valid without a article id" do
    like = Like.new(article_id: nil)
    expect(like).to_not be_valid
  end
  it "is not valid without a user id" do
    like = Like.new(user_id: nil)
    expect(like).to_not be_valid
  end
end
