class Addcensoredtouser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :censored, :boolean, default: false, null: false
  end
end
