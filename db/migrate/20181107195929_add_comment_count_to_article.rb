class AddCommentCountToArticle < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :commentcount, :integer, default: 0, null: false
  end
end
