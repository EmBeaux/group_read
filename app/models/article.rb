class Article < ApplicationRecord
  validates :title, presence:true
  validates :description, presence:true
  validates :url, presence: true
  validates :source, presence: true

  has_many :feeds
  has_many :groups, through: :feeds
end
