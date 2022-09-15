class AddLastPlayedToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :last_played, :bigint
  end
end
