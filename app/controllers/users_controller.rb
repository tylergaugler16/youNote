class UsersController < ApplicationController

def index
	@users= User.all
end

def new
	@user= User.new
end

def show
	@user= User.find(params[:id])
	@top_notes=  Note.where(user_id: @user.id, public: true).limit(5);
end

def create 
	@user= User.new(user_params)
	  	if @user.save
	  		log_in @user
	  		redirect_to @user
	      #same as redirect_to user_url(@user)
	      flash[:success] = 'Welcome to YouNote!'
	  	else
	  		render 'new'
	    end

end



private

 def user_params
	  params.require(:user).permit(:name, :email, :password, :password_confirmation)
 end

end
