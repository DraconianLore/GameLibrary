class Friend < ApplicationRecord
    has_many :friend_lists
    has_many :users, through: :friend_lists
    has_many :friends_game_lists
    has_many :games, through: :friends_game_lists
end
