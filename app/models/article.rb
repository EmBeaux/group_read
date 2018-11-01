class Article < ApplicationRecord
  include HTTParty
  validates :title, presence:true
  validates :description, presence:true
  validates :url, presence: true
  validates :source, presence: true
  
  belongs_to :group
end
