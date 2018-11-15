class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :article_id, :liked_article

  def liked_article
    object.article
  end
end
