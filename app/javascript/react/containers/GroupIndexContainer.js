import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupSignedInTile from '../components/GroupSignedInTile.js'
import TrendingFeedsTile from '../components/TrendingFeedsTile.js'
import { Link } from 'react-router'
import SearchBarTile from '../components/SearchBarTile'
import ArticleShowTile from '../components/ArticleShowTile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas } from '@fortawesome/free-solid-svg-icons'

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
    this.likeClick = this.likeClick.bind(this)
    this.unlikeClick = this.unlikeClick.bind(this)
  }

  likeClick(formPayload){
    fetch('/api/v1/likes',{
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

    })
    .catch(error => console.error('Error:', error));
    this.forceUpdate()
  }

  unlikeClick(formPayload){
    fetch(`/api/v1/likes/${formPayload.article_id}`,{
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
    })
    .catch(error => console.error('Error:', error));
    this.forceUpdate()
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
    library.add(faHeart)
    let groupTitle = "Your Groups:"
    let featuredTitle = "Featured Groups:"
    let signedInTiles = "Haven't mounted";
    let articles;
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

    if (this.state.articles != null){
      articles = this.state.articles.map(article => {
        return(
          <ArticleShowTile
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          url={article.url}
          source={article.source}
          image={article.image}
          likeCount={article.likecount}
          likeClick={this.likeClick}
          unlikeClick={this.unlikeClick}
          user={this.state.user}
          likeClass={"like-btn-true"}
          likeButton={<FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>}
          />
        )
      })
    }

    return(
      <div>
        <div className="index-search" id="index-id-search">
          <SearchBarTile/>
        </div>
        <div className="groups-index">
          <h1 className="index-logo">Welcome to Group Read</h1>
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
            {articles}
          </div>
        </div>
      </div>
    )
  }
}

export default GroupIndexContainer;
