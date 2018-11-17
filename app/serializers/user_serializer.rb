class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :groups
  has_many :memberships
  has_many :likes
  has_many :comments
end
