class UsersController < ApplicationController

def index
	@users= User.all.order('name ASC')
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

def public_notes
	@user= User.find(params[:id])
	@public_notes= @user.notes.where(public: true)
end

def edit 
  @user= User.find(params[:id])
end

def update
	@user= User.find(params[:id])
	if @user.update_attribute(:bio, params[:user][:bio])
	  flash[:success] = "Bio updated"
      redirect_to @user
    else
      render 'edit'
    end
end


private

 def user_params
	  params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio)
 end

end
