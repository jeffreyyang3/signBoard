class TestJob < ApplicationJob
  queue_as :default
  def perform(*args)
    # Do something later
    puts "the time is #{Time.now.hour}:#{Time.now.min}"
  end
end
