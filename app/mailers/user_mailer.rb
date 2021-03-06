class UserMailer < ApplicationMailer
  default from: "sprout@csie.ntu.edu.tw"
  add_template_helper(ApplicationHelper)
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.notify_comment.subject
  #

  def notify_submit(user, answer, home_url)
    @answer = answer
    @user = user
    @homework = answer.homework
    @url = @answer.download_link
    @root_url = home_url.chomp('/')
    mail(to: user.email, subject: "[資訊之芽作業繳交留存] #{@homework.title} - #{@answer.title}")
  end

  def notify_new_homework(user, homework, root_url, homework_url)
    @homework = homework
    @user = user
    @root_url = root_url.chomp('/')
    @homework_url = @root_url + homework_url
    @attachment_url = homework.download_link
    mail(to: user.email, subject: "[資訊之芽作業通知] #{@homework.title}")
  end
   
  def notify_review(user, title, review, homework_url)
    @title = title
    @review = review
    @user = user
    @url = homework_url
    mail(to: user.email, subject: "[資訊之芽作業成績通知] #{title}")
  end

  def notify_confirm(user, password, root_url)
    @email = user.email
    @password = password
    @confirm_code = user.confirm_code
    @url = root_url
    mail(to: @email, subject: "[Sprout LMS 帳號認證] Hi, #{user.name}")
  end
end
