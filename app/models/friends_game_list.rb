class FriendsGameList < ApplicationRecord
  belongs_to :friend
  belongs_to :game
end
