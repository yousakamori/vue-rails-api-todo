# frozen_string_literal: true

class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: %i[show update destroy]

  # GET api/vi/todos/
  def index
    @todos = Todo.all.order(created_at: :asc)
    render json: @todos
  end

  # Post api/vi/todos
  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: { status: 'error', data: @todo.errors }
    end
  end

  # Put api/vi/todos/:id
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: { status: 'error', data: @todo.errors }
    end
  end

  # Delete api/vi/todos/:id
  def destroy
    @todo.destroy
    render json: @todo
  end

  # Delete api/vi/delete_completed
  def delete_completed
    todo = Todo.where(completed: true).delete_all
    render json: todo
  end

  # Put api/vi/check_all
  def check_all
    todo = Todo.update_all(completed: params['checked'])
    render json: todo
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :completed)
  end

  def set_todo
    @todo = Todo.find(params[:id])
  end
end
