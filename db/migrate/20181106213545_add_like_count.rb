class AddLikeCount < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :likecount, :integer, default: 0, null: false
  end
end
