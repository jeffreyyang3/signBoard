class StockInfoController < ApplicationController
  def index
    StockFetchJob.perform_later
    render :json => StockInfo.all
  end
end
