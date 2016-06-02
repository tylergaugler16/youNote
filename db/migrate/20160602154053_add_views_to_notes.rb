class AddViewsToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :views, :integer
  end
end
