import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupSignedInTile from '../components/GroupSignedInTile.js'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import ReactLoading from 'react-loading';
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
    this.commentClick = this.commentClick.bind(this)
    this.uncommentClick = this.uncommentClick.bind(this)
    this.handleGroupClick = this.handleGroupClick.bind(this)
  }

  handleGroupClick(){
    browserHistory.push(`/groups/new`)
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
    let endpoints = [`/api/v1/users`, `/api/v1/articles`]

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
        user: responses[0],
        featuredGroups: responses[0].featured_groups,
        groups: responses[0].groups,
        articles: responses[1]
      })
    })
  }

render() {
  library.add(faHeart)
  let groupTitle = "Your Groups:"
  let featuredTitle = "Featured Groups:"
  let signedInTiles = "Haven't mounted";
  let articles = null
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
  }

  let spinner = <ReactLoading type="bars" color="cadetblue" height={100} width={50} className="index-spinner"/>

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
        commentCount={article.commentcount}
        likeClick={this.likeClick}
        unlikeClick={this.unlikeClick}
        commentClick={this.commentClick}
        uncommentClick={this.uncommentClick}
        user={this.state.user}
        group_id={1}
        />
      )
    })
    spinner = ""
  }



    return(
      <div>
        <div className="index-search" id="index-id-search">
          <SearchBarTile/>
        </div>
        <div className="groups-index">
          <div className="circle-plus tooltip" onClick={this.handleGroupClick}>
            <div className="tooltiptext">
              Click here to make a new group!
            </div>
            <div className="circle">
              <div className="horizontal">
              </div>

              <div className="vertical">
              </div>
            </div>
          </div>
          <h1 className="index-logo">Welcome to Group Read</h1>
            <div className="grid-x small-up-1 medium-up-3">
              <div className="cell small-6" id="your-groups-title">
                <h3 className="your-group-title">{groupTitle}</h3>
              </div>


              <div className="cell small-6" id="featured-groups-title">
                <h3 className="featured-group-title">{featuredTitle}</h3>
              </div>
            </div>
          {signedInTiles}
          <div className="group-bottom">
            <h1>Trending news feeds!</h1>
            {articles}
          </div>
        </div>
        {spinner}
      </div>
    )
  }
}

export default GroupIndexContainer;
