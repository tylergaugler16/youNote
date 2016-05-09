class SessionsController < ApplicationController
  def new
  end

  def create
  	user= User.find_by(email: params[:session][:email].downcase)
  	# an object that isnt nil is true in a boolean context, which is
  	# why we can write this conditional statement
  	if user && user.authenticate(params[:session][:password])
      log_in(user)
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      redirect_to user
  	else
  		flash.now[:danger] = 'Invalid email/password combination'
  		render 'new'
  	end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

end
