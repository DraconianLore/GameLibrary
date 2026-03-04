class AddTimestampsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :games_updated_at, :datetime, default: -> { '1.year.ago' }
    add_column :users, :wishlist_updated_at, :datetime, default: -> { '1.year.ago' }
  end
end
