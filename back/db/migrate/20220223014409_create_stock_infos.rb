class CreateStockInfos < ActiveRecord::Migration[7.0]
  def change
    create_table :stock_infos do |t|
      t.string :symbol
      t.string :price
      t.string :delta

      t.timestamps
    end
  end
end
