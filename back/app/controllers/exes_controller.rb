class ExesController < ApplicationController
  before_action :set_ex, only: %i[ show update destroy ]

  # GET /exes
  # GET /exes.json
  def index
    @exes = Ex.all
  end

  # GET /exes/1
  # GET /exes/1.json
  def show
  end

  # POST /exes
  # POST /exes.json
  def create
    @ex = Ex.new(ex_params)

    if @ex.save
      render :show, status: :created, location: @ex
    else
      render json: @ex.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /exes/1
  # PATCH/PUT /exes/1.json
  def update
    if @ex.update(ex_params)
      render :show, status: :ok, location: @ex
    else
      render json: @ex.errors, status: :unprocessable_entity
    end
  end

  # DELETE /exes/1
  # DELETE /exes/1.json
  def destroy
    @ex.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ex
      @ex = Ex.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ex_params
      params.require(:ex).permit(:name)
    end
end
