class AddUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, unique: true
      t.string :steam_id
      t.string :epic_id
      t.string :gog_id
    end
  end
end
