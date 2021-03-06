class Article < ApplicationRecord
  include HTTParty
  validates :title, presence:true
  validates :description, presence:true
  validates :url, presence: true
  validates :source, presence: true

  belongs_to :group
  
  has_many :likes
  has_many :users, through: :likes

  has_many :comments
  has_many :users, through: :comments
end
