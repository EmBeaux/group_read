class Membership < ApplicationRecord
  validates :user_id, presence:true
  validates :group_id, presence:true

  belongs_to :group
  belongs_to :user
end
