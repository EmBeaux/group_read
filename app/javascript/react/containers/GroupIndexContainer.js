import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupSignedInTile from '../components/GroupSignedInTile.js'
import TrendingFeedsTile from '../components/TrendingFeedsTile.js'
import { Link } from 'react-router'

class GroupIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      articles: null,
      featuredGroups: null,
      groups: null,
    }
    this.followClick = this.followClick.bind(this)
    this.unfollowClick = this.unfollowClick.bind(this)
  }

  followClick(formPayload){

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
  unfollowClick(formPayload){

    fetch(`/api/v1/memberships/${formPayload.group_id}`,{
      credentials: 'same-origin',
      method: "delete"
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
      alert("No longer following!")
    })
    .catch(error => console.error('Error:', error));
    this.forceUpdate()
  }

  componentDidMount() {
    console.log("Index page is mounting")

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
          featuredGroups: body.featured_groups,
          groups: body.groups
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
    })
  }

  render() {
    console.log("Index page is rendering")
    let groupTitle = "Your Groups:"
    let featuredTitle = "Featured Groups:"
    let signedInTiles = "Haven't mounted";
    let trendingFeeds = <TrendingFeedsTile/>
if(this.state.groups != null && this.state.featuredGroups != null && this.state.groups.length < 3){

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
            key={this.state.featuredGroups[number2].id}
            id={this.state.featuredGroups[number2].id}
            name={this.state.featuredGroups[number2].name}
            description={this.state.featuredGroups[number2].description}
            interest={this.state.featuredGroups[number2].interest}
            featured_name={this.state.featuredGroups[number].name}
            featured_key={this.state.featuredGroups[number].id}
            featured_id={this.state.featuredGroups[number].id}
            featured_description={this.state.featuredGroups[number].description}
            featured_interest={this.state.featuredGroups[number].interest}
            followClick={this.followClick}
            unfollowClick={this.unfollowClick}
            user={this.state.user}
          />
        )
      })
    }else if(this.state.groups != null){

      let count = -1
      let groups = this.state.groups
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
          featured_name={this.state.featuredGroups[count].name}
          featured_key={this.state.featuredGroups[count].id}
          featured_id={this.state.featuredGroups[count].id}
          featured_description={this.state.featuredGroups[count].description}
          featured_interest={this.state.featuredGroups[count].interest}
          followClick={this.followClick}
          unfollowClick={this.unfollowClick}
          user={this.state.user}
          />
        )
      })
    }else{

    }

    if(this.state.articles != null){
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
// let arr = [1,2,3]
// let index = -1
// let index2 = 2
// groupTitle = "Featured Groups:"
// featuredTitle = ""
// signedInTiles = arr.map(group => {
//   index++
//   index2++
//   return(
//     <GroupSignedInTile
//     key={this.state.featuredGroups[index2].id}
//     id={this.state.featuredGroups[index2].id}
//     name={this.state.featuredGroups[index2].name}
//     description={this.state.featuredGroups[index2].description}
//     interest={this.state.featuredGroups[index2].interest}
//     featured_name={this.state.featuredGroups[index].name}
//     featured_key={this.state.featuredGroups[index].id}
//     featured_id={this.state.featuredGroups[index].id}
//     featured_description={this.state.featuredGroups[index].description}
//     featured_interest={this.state.featuredGroups[index].interest}
//     followClick={this.followClick}
//     user={this.state.user}
//     />
//   )
// })
