class AddFriendsAvatars < ActiveRecord::Migration[7.0]
  def change
    add_column :friends, :avatar, :string
  end
end
