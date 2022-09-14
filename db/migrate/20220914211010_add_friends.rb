class AddFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.string :steam_id
      t.string :steam_name
      t.string :games, array: true
      t.datetime "updated_at"
    end
  end
end
