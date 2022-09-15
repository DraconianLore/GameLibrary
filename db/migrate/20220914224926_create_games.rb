class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :appid, unique: true
      t.string :name
      t.string :icon
      t.string :image
      t.timestamps
    end
  end
end

