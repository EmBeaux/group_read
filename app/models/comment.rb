class Comment < ApplicationRecord
  validates :user_id, presence:true
  validates :article_id, presence:true
  validates :comment, presence:true
  validates :email, presence:true

  belongs_to :article
  belongs_to :user
  has_many :replies, foreign_key: "reply_id", class_name: "Comment"
  belongs_to :reply, class_name: "Comment", optional: true
end
