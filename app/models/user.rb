class User < ApplicationRecord
    has_many :friend_lists
    has_many :friends, :through => :friend_lists
    has_many :game_lists
    has_many :games, through: :game_lists
end
