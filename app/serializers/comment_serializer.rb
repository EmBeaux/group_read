class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :article_id, :commented_article, :email, :replycount, :reply

  has_many :replies, foreign_key: "reply_id", class_name: "Comment"
  belongs_to :reply, class_name: "Comment"
  def commented_article
    object.article
  end

  def email
    object.user.email
  end
end
