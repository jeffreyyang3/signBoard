require "test_helper"

class ExesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ex = exes(:one)
  end

  test "should get index" do
    get exes_url, as: :json
    assert_response :success
  end

  test "should create ex" do
    assert_difference("Ex.count") do
      post exes_url, params: { ex: { name: @ex.name } }, as: :json
    end

    assert_response :created
  end

  test "should show ex" do
    get ex_url(@ex), as: :json
    assert_response :success
  end

  test "should update ex" do
    patch ex_url(@ex), params: { ex: { name: @ex.name } }, as: :json
    assert_response :success
  end

  test "should destroy ex" do
    assert_difference("Ex.count", -1) do
      delete ex_url(@ex), as: :json
    end

    assert_response :no_content
  end
end
