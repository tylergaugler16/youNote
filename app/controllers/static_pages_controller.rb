class StaticPagesController < ApplicationController
  
  def home
  	params[:page] = params[:page] || 1
 	@home_notes = Note.where(public: true).paginate(page: params[:page], per_page: 9).order('views DESC')
 	
 	respond_to do |format|
	  format.html
	  format.js
	end
  end

  def help
  end

  
end
