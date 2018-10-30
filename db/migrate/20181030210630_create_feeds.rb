class CreateFeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :feeds do |t|
      t.belongs_to :group, null: false
      t.belongs_to :article, null: false

      t.timestamps null: false
    end
  end
end
