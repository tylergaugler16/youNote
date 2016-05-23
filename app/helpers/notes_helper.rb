module NotesHelper


	def note_public?
		Note.where(id: params[:id]).first.public
	end
end
