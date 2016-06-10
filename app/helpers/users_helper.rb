require 'net/http'

module UsersHelper

	def gravatar_for(user)
		if(gravatar?(user) )
			gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    		gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    		image_tag(gravatar_url, alt: user.name, class: "gravatar")
    	else
    		image_tag("profile-default.png", alt: user.name, title: "Create a Gravatar to display a cusom photo")
		end
	end

	private

	def gravatar?(user)
	    gravatar_check = "http://gravatar.com/avatar/#{Digest::MD5.hexdigest(user.email.downcase)}.png?d=404"
	    uri = URI.parse(gravatar_check)
	    http = Net::HTTP.new(uri.host, uri.port)
	    request = Net::HTTP::Get.new(uri.request_uri)
	    response = http.request(request)
	    response.code.to_i != 404 # from d=404 parameter
	end

	def is_logged_in?(user)
		current_user.id == user.id
	end


end
