class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :interest, :description


  has_many :articles
  has_many :users
end
