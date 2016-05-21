class AddPublicToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :public, :boolean
  end
end
