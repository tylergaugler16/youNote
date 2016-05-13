class Note < ActiveRecord::Base
	belongs_to :user

	validates :title, presence: true
	validates :content_item_id, presence: true
end
