class ContentItemsController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	#for: Can't verify CSRF token authenticity
	skip_before_filter  :verify_authenticity_token


  def search
   @videos= Array.new
    videos = Yt::Collections::Videos.new
    videos.where(q: params[:q], order: 'viewCount')
    videos.each do |video|
    @videos.push(video)
  	
  end


  def show
  		@video = Yt::Video.new id: params[:content_item_id]

  end

end
