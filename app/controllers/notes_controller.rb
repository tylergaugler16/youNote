class NotesController < ApplicationController
	# respond_to :html, :js

	def index
		@notes = Note.where(user_id: current_user.id)
	end

	def show
		@note= Note.find(params[:id])
		@note_video=  Yt::Video.new id: @note.content_item_id
	end

	def new
		@note= Note.new
	end

	def create
		@note= Note.new(note_params)
		if @note.save
			redirect_to @note
		else
			redirect_to "content_items/search?content_item_id=#{params[:content_item_id]}"
		end
	end

	def edit

	end

	def update
		@note= Note.find(params[:id])
		if(@note.update(note_params))
			redirect_to @note
		else
			render 'index'
		end


	end

	def destroy

	end



	private

	def find_note

	end

	def note_params
		params.require(:note).permit(:title,:content,:user_id,:content_item_id)
	end
end
