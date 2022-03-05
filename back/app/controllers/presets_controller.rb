class PresetsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    puts 'bobo'
    render :json => Preset.all
  end

  def create
    p = Preset.create({ :info_string => params[:info_string], :title => params[:title] })
    render :json => p
  end

  def destroy
    Preset.destroy(params[:id])
  end
end
