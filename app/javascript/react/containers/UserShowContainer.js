import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UserGroupTile from '../components/UserGroupTile.js';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { browserHistory } from 'react-router'
import SearchBarTile from '../components/SearchBarTile'
import ArticleShowTile from '../components/ArticleShowTile.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas } from '@fortawesome/free-solid-svg-icons'

class UserShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      groups: null,
      articles: null,
      current_user: null
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
    let endpoints = [`/api/v1/users/${this.props.params.id}`, `/api/v1/groups`, `/api/v1/users`]

    let promises = endpoints.map((endpoint) => {
      return fetch(endpoint)
    })

    Promise.all(promises).then((responses) =>{
      let parsedResponses = responses.map((response) => {
        return response.json();
      })
      return Promise.all(parsedResponses)
    })
    .then(responses => {
      this.setState({
        groups: responses[1],
        articles: responses[0].articles,
        user: responses[0],
        current_user: responses[2]
      })
    })
  }

  render() {
    library.add(faHeart)

    let email;

    if(this.state.user != null){
      let emailArray = this.state.user.email.split('@')
      email = emailArray[0]
    }

    let yourGroups;
    let allGroups;

    if(this.state.user != null){
      yourGroups = this.state.user.groups.map(group => {
        return(
          <UserGroupTile
          key={group.id}
          id={group.id}
          name={group.name}
          description={group.description}
          interest={group.interest}
          followClick={this.followClick}
          unfollowClick={this.unfollowClick}
          current_user={this.state.current_user}
          user={this.state.user}
          />
        )
      })
    }
    if(this.state.groups != null){
      allGroups = this.state.groups.map(group => {
        return(
          <UserGroupTile
            key={group.id}
            id={group.id}
            name={group.name}
            description={group.description}
            interest={group.interest}
            followClick={this.followClick}
            unfollowClick={this.unfollowClick}
            current_user={this.state.current_user}
            user={this.state.user}
          />
        )
      })
    }
    let groups;
    let likedArticles = ["", ""]

    if (this.state.articles != null){
      likedArticles = this.state.articles.map(article => {
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
          user={this.state.current_user}
          likeClass={"like-btn-true"}
          likeButton={<FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>}
          />
        )
      })
    }
    return(
      <div>
        <div className="index-search">
          <SearchBarTile />
        </div>
        <div className="grid-x small-up-1 medium-up-3">
          <div className="cell small-6" id="your-groups-title">
          <h4>{email}'s Groups:</h4>
            <div className="user-groups">
              <div className="scroll">
                <div className="scroller">
                  <div className="item">
                    {yourGroups}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className="cell small-6" id="all-groups-scroll">
          <h4>All Groups:</h4>
            <div className="user-groups">
              <div className="scroll2">
                <div className="scroller">
                  <div className="item">
                    {allGroups}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="liked-articles">
        <h1>Liked Articles</h1>
        {likedArticles.reverse()}
        </div>
      </div>
    )
  }
}

export default UserShowContainer;
