import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupSignedInTile from '../components/GroupSignedInTile.js'
import TrendingFeedsTile from '../components/TrendingFeedsTile.js'
import { Link } from 'react-router'

  class GroupIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articles: [],
      followed: false,
      featuredGroups: []
    }
    this.followClick = this.followClick.bind(this)
  }

followClick(formPayload){
  this.setState({followed: true})

  fetch('/api/v1/memberships',{
    credentials: 'same-origin',
    method: "post",
    body: JSON.stringify(formPayload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
    }
  })
  .then(response => response.json())
  .then(body => {
    alert("Now following!")
  })
  .catch(error => console.error('Error:', error));
  this.forceUpdate()
}


  componentDidMount() {
    fetch('/api/v1/users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
        this.setState({
          user: body,
          featuredGroups: body.featured_groups
        })
    })

    fetch('/api/v1/articles')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
        this.setState({articles: body})
    })
  }

  render() {
    let groupTitle = "Your Groups:"
    let signedInTiles = [];
    let tile;
    let trendingFeeds = <TrendingFeedsTile/>
    let featuredTitle = "Featured Groups:"

    if(this.state.user.groups){
      if(this.state.user.groups.length < 3){
        let arr = [1,2,3]
        let number = -1
        let number2 = 2
        groupTitle = "Featured Groups:"
        featuredTitle = ""
        signedInTiles = arr.map(group => {

          number++
          number2++
          return(
            <GroupSignedInTile
              key={this.state.user.featured_groups[number2].id}
              id={this.state.user.featured_groups[number2].id}
              name={this.state.user.featured_groups[number2].name}
              description={this.state.user.featured_groups[number2].description}
              interest={this.state.user.featured_groups[number2].interest}
              featured_name={this.state.user.featured_groups[number].name}
              featured_key={this.state.user.featured_groups[number].id}
              featured_id={this.state.user.featured_groups[number].id}
              featured_description={this.state.user.featured_groups[number].description}
              featured_interest={this.state.user.featured_groups[number].interest}
              followClick={this.followClick}
              user={this.state.user}
            />
          )
        })
      }else{
        let count = -1
        let groups = this.state.user.groups
        let size = 3;
        let threeGroups = groups.slice(0, size).map(group => {
          return group
        })
        signedInTiles = threeGroups.map(group => {
          count++
          return(
            <GroupSignedInTile
            key={group.id}
            id={group.id}
            name={group.name}
            description={group.description}
            interest={group.interest}
            featured_name={this.state.user.featured_groups[count].name}
            featured_key={this.state.user.featured_groups[count].id}
            featured_id={this.state.user.featured_groups[count].id}
            featured_description={this.state.user.featured_groups[count].description}
            featured_interest={this.state.user.featured_groups[count].interest}
            followClick={this.followClick}
            user={this.state.user}
            />
          )
        })
      }
    }

  if(this.state.user.featured_groups && typeof this.state.user.groups == "undefined"){
    let arr = [1,2,3]
    let index = -1
    let index2 = 2
    groupTitle = "Featured Groups:"
    featuredTitle = ""
    signedInTiles = arr.map(group => {
      index++
      index2++
      return(
        <GroupSignedInTile
          key={this.state.user.featured_groups[index2].id}
          id={this.state.user.featured_groups[index2].id}
          name={this.state.user.featured_groups[index2].name}
          description={this.state.user.featured_groups[index2].description}
          interest={this.state.user.featured_groups[index2].interest}
          featured_name={this.state.user.featured_groups[index].name}
          featured_key={this.state.user.featured_groups[index].id}
          featured_id={this.state.user.featured_groups[index].id}
          featured_description={this.state.user.featured_groups[index].description}
          featured_interest={this.state.user.featured_groups[index].interest}
          followClick={this.followClick}
          user={this.state.user}
        />
      )
    })
  }


    if(this.state.articles != []){
      trendingFeeds = this.state.articles.map(feed => {
        return(
          <TrendingFeedsTile
          key={feed.id}
          title={feed.title}
          description={feed.description}
          image={feed.image}
          url={feed.url}
          source={feed.source}
          />
        )
      })
    }

    trendingFeeds.length = 20

    return(
      <div>
        <div className="groups-index">
          <h1>Welcome to Group Read</h1>
            <div className="grid-x small-up-1 medium-up-3">
              <div className="cell small-6" id="your-groups-title">
                <h3>{groupTitle}</h3>
                <Link to="/groups/new" className="button">Make a new Group!</Link>
              </div>

              <div className="cell small-6" id="featured-groups-title">
                <h3>{featuredTitle}</h3>
              </div>
            </div>

        {signedInTiles}
        <div className="group-bottom">
          <h1>Trending news feeds!</h1>
            {trendingFeeds}
          </div>
        </div>
      </div>
    )
  }
}

export default GroupIndexContainer;
