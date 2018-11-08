require 'spec_helper'
require_relative '../../app/models/comment'

RSpec.describe Comment, type: :model do
  it "is valid with valid attributes" do
    group = Group.create(name: "Hello", interest: "hello", description: "bleh")
    user = User.create(email: "matthew.bowler123@gmail.com", encrypted_password: "smith", password: "smithhhhhh")
    article = Article.create!(title: "Hello", url: "hello", description: "bleh", source: "bleh", group_id: group.id)
    expect(Comment.new(user_id: user.id, article_id: article.id, comment: "Hello", email: user.email)).to be_valid
  end
  it "is not valid without a article id" do
    comment = Comment.new(article_id: nil)
    expect(comment).to_not be_valid
  end
  it "is not valid without a user id" do
    comment = Comment.new(user_id: nil)
    expect(comment).to_not be_valid
  end
  it "is not valid without a comment" do
    comment = Comment.new(comment: nil)
    expect(comment).to_not be_valid
  end
  it "is not valid without an email" do
    comment = Comment.new(email: nil)
    expect(comment).to_not be_valid
  end
end
