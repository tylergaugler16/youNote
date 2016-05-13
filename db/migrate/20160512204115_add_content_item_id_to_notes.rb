class AddContentItemIdToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :content_item_id, :string
  end
end
