require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :group do
    name { 'Group 1' }
    interest { 'dogs' }
    description { 'Group 1 for Dogs.' }
  end

end
