class Friend < ApplicationRecord
    has_many :friend_lists
    has_many :users, through: :friend_lists
    
end
