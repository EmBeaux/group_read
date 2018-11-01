require 'spec_helper'
require_relative '../../app/models/article'

RSpec.describe Article, type: :model do
  it "is valid with valid attributes" do
    group = Group.create(name: "Group", interest: "group", description: "A group")
    expect(Article.new(title: "This is an article title", description: "This is an article description", url: "https://www.google.com", source: "Huffington Post", group_id: group.id)).to be_valid
  end
  it "is not valid without an title" do
    article = Article.new(title: nil)
    expect(article).to_not be_valid
  end
  it "is not valid without a encrypted description" do
    article = Article.new(description: nil)
    expect(article).to_not be_valid
  end
  it "is not valid without a url" do
    article = Article.new(url: nil)
    expect(article).to_not be_valid
  end
  it "is not valid without a source" do
    article = Article.new(source: nil)
    expect(article).to_not be_valid
  end
end
