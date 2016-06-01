

class ContentItemsController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	#for: Can't verify CSRF token authenticity
	skip_before_filter  :verify_authenticity_token

  def search
   # so that the iniatial get request does not execute an empty search
    if !params[:q].blank?  || !params[:page].blank? 
        params[:page] = params[:page] || 1
        @videos= []
        videos = Yt::Collections::Videos.new
        videos.where(q: params[:q], order: 'relevance', )
        videos.each do |v|
          @videos<<v
        end
        number_of_pages= @videos.size >= 300? 300 : @videos.size
        
        @page = WillPaginate::Collection.create(params[:page], 30, number_of_pages) do |pager|
          pager.replace @videos[pager.offset, 30]
         end
     end
  end


  def show
  		@video = Yt::Video.new id: params[:content_item_id]
  end

end
