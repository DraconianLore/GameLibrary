class FriendsPrivateGames < ActiveRecord::Migration[7.0]
  def change
    add_column :friends, :privacy, :bool, default: true
  end
end
