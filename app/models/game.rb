class Game < ApplicationRecord
    has_many :friends_game_lists
    has_many :friends, through: :friends_game_lists
    has_many :game_lists
    has_many :users, through: :game_lists
end
