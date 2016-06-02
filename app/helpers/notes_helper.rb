module NotesHelper


	def note_public?
		Note.where(id: params[:id]).first.public
	end

	def user_of_note(note)
		name = User.find(note.user_id).name
	end

	def note_video_url(note)
		video= Yt::Video.new id: note.content_item_id
		video.thumbnail_url
	end
end
