class ReviewsController < ApplicationController
  def new
    @homework = Homework.find(params[:homework_id])
    @answer = Answer.find(params[:id])
    if is_admin?(current_user)
      @review = @answer.build_review
    elsif current_user != @answer.author
      redirect_to homework_path(@homework), alert: "不要偷看別人的作業>//<"
    end
  end

  def create
    @homework = Homework.find(params[:homework_id])
    @answer = @homework.answers.find(params[:answer_id])
    @review = @answer.build_review(review_params)
    if @review.save
      redirect_to homework_path(@homework), notice: "成功評分！"
    else
      render :new 
      flash[:alert] = "至少幫他打個分數吧OAO！"
    end
  end

  def update
    @homework = Homework.find(params[:homework_id])
    @answer = @homework.answers.find(params[:answer_id])
    @review = @answer.review
    if @review.update(review_params)
      redirect_to homework_path(@homework), notice: "成功更改評分！"
    else
      render :new 
      flash[:alert] = "至少幫他打個分數吧OAO！"
    end
  end

private
  
  def review_params
    params.require(:review).permit(:point, :comment)
  end

end
