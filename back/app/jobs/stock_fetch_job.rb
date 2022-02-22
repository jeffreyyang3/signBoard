require 'http'
class StockFetchJob < ApplicationJob
  queue_as :default
  def finnhubGet 
    puts 'token is'
    puts ENV['FINNHUB_KEY']
    res = HTTP.headers('X-Finnhub-Token' => ENV['FINNHUB_KEY'])
      .get('https://finnhub.io/api/v1/quote?symbol=OPEN')
      .to_s
    puts res
  end
  def perform(*args)
    finnhubGet
    # Do something later
  end
end
