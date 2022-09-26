class AddWishlistOrderToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :wishlist_order, :int, default: 0
  end
end
