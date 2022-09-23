class ChangeLoginToSteam < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.remove :email, :steam_name
    end

  end
end
