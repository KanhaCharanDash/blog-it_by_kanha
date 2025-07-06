class MakeIsBloggableNotNullableInPosts < ActiveRecord::Migration[7.1]
  def change
    change_column_null :posts, :is_bloggable, false
  end
end
