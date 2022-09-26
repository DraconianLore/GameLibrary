# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_26_183711) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friend_lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friend_lists_on_friend_id"
    t.index ["user_id"], name: "index_friend_lists_on_user_id"
  end

  create_table "friends", force: :cascade do |t|
    t.string "steam_id"
    t.string "steam_name"
    t.datetime "updated_at"
    t.string "avatar"
  end

  create_table "friends_game_lists", force: :cascade do |t|
    t.bigint "friend_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friends_game_lists_on_friend_id"
    t.index ["game_id"], name: "index_friends_game_lists_on_game_id"
  end

  create_table "game_lists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_lists_on_game_id"
    t.index ["user_id"], name: "index_game_lists_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "appid"
    t.string "name"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "last_played"
    t.boolean "is_multiplayer"
    t.boolean "is_coop"
    t.boolean "is_pvp"
    t.boolean "runs_on_windows"
    t.boolean "runs_on_mac"
    t.boolean "runs_on_linux"
    t.text "description"
    t.integer "current_discount"
    t.integer "wishlist_order", default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "steam_id"
    t.datetime "updated_at", default: "2022-09-15 00:50:13", null: false
    t.datetime "created_at"
  end

  create_table "wishlists", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_wishlists_on_game_id"
    t.index ["user_id"], name: "index_wishlists_on_user_id"
  end

  add_foreign_key "friend_lists", "friends"
  add_foreign_key "friend_lists", "users"
  add_foreign_key "friends_game_lists", "friends"
  add_foreign_key "friends_game_lists", "games"
  add_foreign_key "game_lists", "games"
  add_foreign_key "game_lists", "users"
  add_foreign_key "wishlists", "games"
  add_foreign_key "wishlists", "users"
end
