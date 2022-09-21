class AddMoreGameData < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :is_multiplayer, :bool
    add_column :games, :is_coop, :bool
    add_column :games, :is_pvp, :bool
    add_column :games, :runs_on_windows, :bool
    add_column :games, :runs_on_mac, :bool
    add_column :games, :runs_on_linux, :bool
    add_column :games, :description, :text
    add_column :games, :current_discount, :int
  end
end
