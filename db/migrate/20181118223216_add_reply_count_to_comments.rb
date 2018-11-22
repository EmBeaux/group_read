class AddReplyCountToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :replycount, :integer, default: 0, null: false
  end
end
