# frozen_string_literal: true

3.times do |i|
  Todo.create(title: "title No#{i + 1}", completed: i.even?)
end
