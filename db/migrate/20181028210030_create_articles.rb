class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :url, null: false
      t.string :source, null: false

      t.timestamps null: false
    end
  end
end
