class FixInfoStringTypo < ActiveRecord::Migration[7.0]
  def change
    rename_column :presets, :info_sting, :info_string
  end
end
