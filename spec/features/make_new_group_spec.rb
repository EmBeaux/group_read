# require 'rails_helper'
#
# feature 'user makes new group', %Q{
#   As an authenticated user
#   I want to make a new group
#   So that I can make a new news feed
# } do
#
#
#   scenario 'user makes new group' do
#     user = FactoryBot.create(:user)
#     group = FactoryBot.create(:group)
#
#     visit new_user_session_path
#     # binding.pry
#
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: user.password
#     click_button 'Log in'
#
#
#     visit "/groups/new"
#
#     binding.pry
#     fill_in "name", with: group.name
#     fill_in 'interest', with: group.interest
#     fill_in 'description', with: group.description
#
#     find('[type=submit]').click
#
#     expect(page).to have_content(group.name)
#
#   end
#
#   scenario 'incomplete form submission' do
#     visit new_group_path
#
#     find('[type=submit]').click
#
#     expect(page).to_not have_content('Please fill out all forms!')
#   end
# end
