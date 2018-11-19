import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ArticleShowTile from '../components/ArticleShowTile.js'
import SearchBarTile from '../components/SearchBarTile.js'


class ArticleShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {},
      articles: [],
      id: this.props.params.id,
      user: null
    }
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

  componentDidMount() {
    let endpoints = [`/api/v1/groups/${this.state.id}`, `/api/v1/groups`, `/api/v1/users`]

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
      responses[1].forEach((item) => {
        if(item.id == this.state.id){
          this.setState({
            group: item,
            articles: responses[0].articles,
            user: responses[2]
          })
        }
      })
    })
  }

  render() {



    let articles;
    if(this.state.articles != []){
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
          group_id={this.props.params.id}
          />
        )
      })
    }
    return(
      <div>
        <div className="side-nav">
          <h3>{this.state.group.name}</h3>
          <h4>{this.state.group.description}</h4>
          <h6>{this.state.group.interest}</h6>
        </div>
        <div className="row small-up-1 medium-up-3">
          {articles}
        </div>
      </div>
    )
  }
}

export default ArticleShowContainer;
