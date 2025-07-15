# frozen_string_literal: true

class User < ApplicationRecord
  EMAIL_REGEX = /\A[^@\s]+@[^@\s]+\z/

  belongs_to :organization
  has_many :posts, dependent: :destroy

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, format: { with: EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }, if: :password_digest_changed?
end
