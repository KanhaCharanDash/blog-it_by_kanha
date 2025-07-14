# frozen_string_literal: true

class CreateJoinTableCategoriesPosts < ActiveRecord::Migration[7.1]
  def change
    create_join_table :categories, :posts do |t|
      t.index [:category_id, :post_id], unique: true
      # Optional: t.timestamps
    end
  end
end
