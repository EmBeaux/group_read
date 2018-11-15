class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :article_id, :commented_article, :email

  def commented_article
    object.article
  end

  def email
    object.user.email
  end
end
