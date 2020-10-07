require 'sinatra'
require 'sinatra/base'
require 'sinatra/session'
require 'sinatra/reloader' if development?
require 'pry-byebug'
require 'better_errors'

require_relative 'repository'
require_relative 'diary'
require_relative 'user_repository'
require_relative 'users'

set :bind, '0.0.0.0'

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = File.expand_path('..', __FILE__)
end

enable :sessions

get '/' do
  erb :index
end

get '/login' do
  erb :fail
end

get '/create' do
  erb :create
end

get '/new' do
  erb :new
end

post '/home' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  session[:user] = params[:name].downcase
  student = repo.find_by_name(params[:name].downcase)
  redirect to '/login' if student.nil?

  redirect to '/home' if student.name == params[:name].downcase
end

get '/home' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  @name = session[:user]
  student = repo.find_by_name(@name)
  repo = Repository.new(File.join(__dir__, "Data/#{student.csv_file_path}"))
  @elements = repo.all
  erb :home
end

post '/create' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  name = params[:new_name].downcase
  student = repo.find_by_name(name)
  if student.nil?
    user = User.new(name)
    repo.add_user(user)
    session[:user] = name
    redirect to '/home'
  else
    redirect to '/'
  end
end

post '/elements' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  name = session[:user]
  student = repo.find_by_name(name)
  j_repo = Repository.new(File.join(__dir__, "Data/#{student.csv_file_path}"))
  element = Diary.new(params[:date], params[:entry])
  j_repo.add_entry(element)
  redirect to '/home'
end

get '/elements/:index' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  name = session[:user]
  student = repo.find_by_name(name)
  j_repo = Repository.new(File.join(__dir__, "Data/#{student.csv_file_path}"))
  j_repo.remove_at(params[:index].to_i)
  redirect to '/home'
end

get '/update/:index' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  session[:id] = params[:index].to_i
  name = session[:user]
  student = repo.find_by_name(name)
  j_repo = Repository.new(File.join(__dir__, "Data/#{student.csv_file_path}"))
  elements = j_repo.all
  @updated_element = elements[session[:id]]
  erb :update
end

post '/updated' do
  repo = UserRepository.new(File.join(__dir__, 'Data/users.csv'))
  name = session[:user]
  student = repo.find_by_name(name)
  j_repo = Repository.new(File.join(__dir__, "Data/#{student.csv_file_path}"))
  elements = j_repo.all
  updated_element = elements[session[:id]]
  updated_element.date_input = params[:date]
  updated_element.entry = params[:entry]
  j_repo.update_entry
  redirect to '/home'
end
