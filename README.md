# GroupRead
[![Build Status](https://codeship.com/projects/62ae2c10-bdd0-0136-9f6e-62daa5c189cd/status?branch=master)


**"Group Read"** is a web site built for Users to interact with each other through user created groups. These groups have articles that are fetched from an external API; they are fetched based off of the interest of the group. The group's articles are then displayed on the group's page and users are free to interact through likes and comments.

**Author**
Matt Bowler

**Heroku Link**
https://group-read.herokuapp.com/

**List of Features**

GroupRead features an index of 3 groups you are a part of and 3 groups you are not a part of, and below that on the home page is a trending articles feed. In addition to that, each group has a group show page that displays all the articles that match that group. Finally, there is a user profile page where you can see all of the articles you have liked and commented on, and you can also see a complete list of the groups you are a part of and another list containing every group that has been created.


**Index Page**
  - Follow and unfollow groups

  - Create a new group
    ~ The form will take in a name, interest, and description

  - Like and comment on articles in the trending feed

**Show Page**
  - Each show page will have a matching news feed

  - Like and comment on each article in the feed

  - Interact with other users in your group

**Profile Page**
  - 4 Total scroll boxes containing important information
    ~The first box contains all the groups the user is following
    ~The second box contains all of the groups that have been created
    ~The third box contains all of the articles that the user has liked
    ~The final box contains all of the articles that the user has commented on





**Outline of technologies used:**

NewsAPI.org
Devise
React
Postgresql
Rails
