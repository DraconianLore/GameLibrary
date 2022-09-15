class AddTimestampsToUser < ActiveRecord::Migration[7.0]
  def change
      add_column :users, :updated_at, :datetime, null: false, default: Time.zone.now
  end
end
