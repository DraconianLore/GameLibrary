class AddNicknamesToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :steam_name, :string
  end
end
