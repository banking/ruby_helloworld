class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(phone: params[:session][:phone])
    if !user
      user = User.find_by(name: params[:session][:phone])
    end

    if user && user.authenticate(params[:session][:password])
      debugger
      log_in user
      # redirect_to user
      redirect_to root_url
    else
      debugger
      flash[:danger] = 'Invalid phone/password combination'
      render 'new'
    end
  end


  def destroy
    log_out
    redirect_to root_url
  end

end
