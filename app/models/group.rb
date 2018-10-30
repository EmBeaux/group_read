class Group < ApplicationRecord
  validates :name, presence:true
  validates :interest, presence:true


  has_many :feeds
  has_many :articles, through: :feeds
end
