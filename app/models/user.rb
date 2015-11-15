class User < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 50 }
  validates :phone, presence: true, length: { maximum: 11 },
            uniqueness: { case_sensitive: false }
  validates :address, presence: true, length: { maximum: 30 }
  has_secure_password
  validates :password, length: { minimum: 6 }
end
