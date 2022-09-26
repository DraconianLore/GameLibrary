class User < ApplicationRecord
    has_many :friend_lists, dependent: :destroy
    has_many :friends, :through => :friend_lists
    has_many :game_lists, dependent: :destroy
    has_many :games, through: :game_lists
    has_many :wishlists, dependent: :destroy
    has_many :wishlist_games, :through => :wishlists, :source => :game
end
