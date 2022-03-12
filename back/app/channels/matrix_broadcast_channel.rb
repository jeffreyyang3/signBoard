class MatrixBroadcastChannel < ApplicationCable::Channel
  def subscribed
    stream_from Preset
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
