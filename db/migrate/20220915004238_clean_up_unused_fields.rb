class CleanUpUnusedFields < ActiveRecord::Migration[7.0]
  def change
    remove_column :friends, :games
    remove_column :games, :image
  end
end
