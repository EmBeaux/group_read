class AddUsernameToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :email, :string, null: false
  end
end
