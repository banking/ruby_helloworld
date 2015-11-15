require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @user = User.new(name: "admin_banking", phone: "15510352329",address: "鄄城一中", password: "foobar", password_confirmation: "foobar")
  end
end
