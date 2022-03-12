class PresetsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    ActionCable.server.broadcast('Preset', { bobo: true })
    render :json => Preset.all
  end

  def create
    puts params[:title]
    puts params[:info_string]
    p = Preset.create({ :info_string => params[:info_string], :title => params[:title] })
    render :json => p
  end

  def destroy
    Preset.destroy(params[:id])
  end
end
