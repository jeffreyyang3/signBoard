class AddStockSymbolUnique < ActiveRecord::Migration[7.0]
  def change
    add_index :stock_infos, :symbol, :unique => true
  end
end
