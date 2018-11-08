class Comment < ApplicationRecord
  validates :user_id, presence:true
  validates :article_id, presence:true
  validates :comment, presence:true
  validates :email, presence:true

  belongs_to :article
  belongs_to :user
end
