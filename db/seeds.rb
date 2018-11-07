# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

groups_attributes = [
  {name: "TrendingFeeds", interest: "trending", description: "Trending News!"},
  {name: "Wine moms!", interest: "Wine", description: "We love wine!"},
  {name: "Esports", interest: "esports", description: "We love gaming!"}
  {name: "Paintball group", interest: "paintball", description: "We love shooting eachother"}
  {name: "Thanksgiving", interest: "thanksgiving turkey", description: "We love eating!"}
  {name: "Christmas Ready", interest: "christmas", description: "We can't wait for christmas."}
  {name: "Walking dead", interest: "zombies", description: "We love the walking dead!"}
  {name: "Motocross", interest: "motocross", description: "We love dirtbikes dude."}
  {name: "Coding!", interest: "coding", description: "We live and breath code."}
  {name: "Tech Junkies", interest: "technology", description: "We love tech!"}
  {name: "Apple lovers", interest: "apple mac iphone", description: "We appreciate apple"}
]

groups_attributes.each do |group|
  Group.create(group)
end
