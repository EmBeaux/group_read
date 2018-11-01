class Group < ApplicationRecord
  validates :name, presence:true
  validates :interest, presence:true

  has_many :articles
  has_many :memberships
  has_many :users, through: :memberships
end
