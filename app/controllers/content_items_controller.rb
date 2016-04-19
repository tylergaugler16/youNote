class ContentItemsController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	#for: Can't verify CSRF token authenticity
	skip_before_filter  :verify_authenticity_token


  def search
      page = params[:page] || 1
      @videos= []
      videos = Yt::Collections::Videos.new
      videos.where(q: params[:q], order: 'viewCount')
      videos.each do |v|
        @videos<<v
      end
     @videos = @videos[(page-1)*9, page*9]
   
  end


  def show
  		@video = Yt::Video.new id: params[:content_item_id]

  end

end
