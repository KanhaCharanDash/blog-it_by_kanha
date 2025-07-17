# frozen_string_literal: true

class AddStatusToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :status, :string, default: "drafted", null: false

    return unless ActiveRecord::Base.connection.adapter_name.downcase != "sqlite"

    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE posts
          ADD CONSTRAINT status_check
          CHECK (status IN ('drafted', 'published'))
        SQL
      end

      dir.down do
        execute <<-SQL
          ALTER TABLE posts
          DROP CONSTRAINT status_check
        SQL
      end
    end
  end
end
