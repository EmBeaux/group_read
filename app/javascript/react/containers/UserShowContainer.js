import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UserGroupTile from '../components/UserGroupTile.js';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { browserHistory } from 'react-router'
import SearchBarTile from '../components/SearchBarTile'
import ArticleScrollTile from '../components/ArticleScrollTile.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas } from '@fortawesome/free-solid-svg-icons'

class UserShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      groups: null,
      likedArticles: null,
      current_user: null
    }
    this.followClick = this.followClick.bind(this)
    this.unfollowClick = this.unfollowClick.bind(this)
    this.likeClick = this.likeClick.bind(this)
    this.unlikeClick = this.unlikeClick.bind(this)
    this.commentClick = this.commentClick.bind(this)
    this.uncommentClick = this.uncommentClick.bind(this)
  }

  commentClick(formPayload){
    fetch('/api/v1/comments',{
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

  uncommentClick(formPayload){
    fetch(`/api/v1/comments/${formPayload.article_id}`,{
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
        likedArticles: responses[0].likes,
        commentedArticles: responses[0].comments,
        user: responses[0],
        current_user: responses[2]
      })
    })
  }

  render() {
    library.add(faHeart)

    let newEmail = "abc"

    if(this.state.user != null){
      let emailArray = this.state.user.email.split('@')
      let email = emailArray[0]
      newEmail = email[0].toUpperCase() + email.slice(1)
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
    let commentedArticles = ["", ""]

    if (this.state.commentedArticles != null){
      commentedArticles = this.state.commentedArticles.map(article => {
        return(
          <ArticleScrollTile
          key={article.commented_article.id}
          id={article.commented_article.id}
          title={article.commented_article.title}
          description={article.commented_article.description}
          url={article.commented_article.url}
          source={article.commented_article.source}
          image={article.commented_article.image}
          likeCount={article.commented_article.likecount}
          commentCount={article.commented_article.commentcount}
          likeClick={this.likeClick}
          unlikeClick={this.unlikeClick}
          commentClick={this.commentClick}
          uncommentClick={this.uncommentClick}
          user={this.state.current_user}
          likeClass={"like-btn-true"}
          likeButton={<FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>}
          group_id={article.commented_article.group_id}
          />
        )
      })
    }
    let likedArticles = ["", ""]

    if (this.state.likedArticles != null){
      likedArticles = this.state.likedArticles.map(article => {

        return(
          <ArticleScrollTile
          key={article.liked_article.id}
          id={article.liked_article.id}
          title={article.liked_article.title}
          description={article.liked_article.description}
          url={article.liked_article.url}
          source={article.liked_article.source}
          image={article.liked_article.image}
          likeCount={article.liked_article.likecount}
          commentCount={article.liked_article.commentcount}
          likeClick={this.likeClick}
          unlikeClick={this.unlikeClick}
          commentClick={this.commentClick}
          uncommentClick={this.uncommentClick}
          user={this.state.current_user}
          likeClass={"like-btn-true"}
          likeButton={<FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>}
          group_id={article.liked_article.group_id}
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
            <div className="user-groups">
            <h4>{newEmail}'s Groups:</h4>
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
            <div className="all-groups">
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
        <div className="grid-x small-up-1 medium-up-3">
          <div className="cell small-6" id="your-groups-title">
            <div className="user-groups">
            <h4>{newEmail}'s Liked Articles:</h4>
              <div className="scroll">
                <div className="scroller">
                  <div className="item3">
                    <div className="liked-articles">
                      {likedArticles.reverse()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cell small-6" id="all-groups-scroll">
            <div className="all-comments">
            <h4>{newEmail}'s Comments:</h4>
              <div className="scroll2">
                <div className="scroller">
                  <div className="item3">
                    {commentedArticles}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserShowContainer;
