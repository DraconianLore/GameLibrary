class AddRefreshTimestampsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :games_updated_at, :datetime
    add_column :users, :wishlist_updated_at, :datetime
    
    # Set default values for existing users
    User.update_all(games_updated_at: 1.year.ago, wishlist_updated_at: 1.year.ago)
    
    # Set future default values for new users
    change_column_default :users, :games_updated_at, 1.year.ago
    change_column_default :users, :wishlist_updated_at, 1.year.ago
  end
end
