class User < ApplicationRecord
    has_many :friend_lists
    has_many :friends, :through => :friend_lists
    
end
