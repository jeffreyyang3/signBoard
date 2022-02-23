require 'http'
class StockFetchJob < ApplicationJob
  queue_as :default
  def finnhub_update (symbol, model)
    res = HTTP.headers('X-Finnhub-Token' => ENV['FINNHUB_KEY'])
      .get("https://finnhub.io/api/v1/quote?symbol=#{symbol}")
      .to_s
    data = JSON.parse res
    logger.info "fetched info #{res}"
    model.update(
      :delta => data['dp'],
      :price => data['c']
    )
  end
  def perform(*args)
    StockInfo.all.each do |stock_info|
      finnhub_update stock_info.symbol, stock_info
    end
    # Do something later
  end
end
