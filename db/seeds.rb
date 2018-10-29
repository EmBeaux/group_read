# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

articles_attributes = [
  {title: 'Suprising link between cake and weight gain!', description: 'Recent studies show that weight gain and cake eating are directly linked. However, not eating any cake doesn\'t mean you can gain weight.', url:"http://google.com", source: "Huffington Post"},
  {title: 'President Trump is tweeting again!', description: 'The President is tweeting again! Will this tweet be bashing political figures? Pursuing nuclear destruction by tweeting Kim Jung Un? Bashing leaders of opposing political groups? I expect a hat trick this week! Let\'s find out!', url:"https://wikipedia.com", source: "The Onion"},
  {title: 'Your favorite color may say a lot about you!', description: 'The color blue screams insecurity, but the color red communicates a more aggresive life style. Click here to read more.', url:"https://amazon.com", source: "Buzzfeed"}
]

articles_attributes.each do |article|
  Article.create(article)
end
