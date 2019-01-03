import React, { Component } from 'react';
import { Link } from 'react-router'
import CommentTile from './CommentTile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas, faComment } from '@fortawesome/free-solid-svg-icons'

class ArticleShowTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeClass: "like-btn",
      likeButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>,
      likeCount: this.props.likeCount,
      commentClass: "comment-btn",
      commentButton:  <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment" size="2x"/>,
      commentCount: this.props.commentCount,
      commentForm: ""
    }
    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.handleCommentClick = this.handleCommentClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if(this.props.user != null){
      for (let i=0; i < this.props.user.likes.length; i++) {
        if (this.props.user.likes[i].article_id == this.props.id){
          this.setState({
            likeClass: "like-btn-true",
            likeButton: <FontAwesomeIcon color= 'red' prefix="fas" icon="heart" size="2x"/>
          })
        }
      }
    }
  }


  handleLikeClick(){
    let formPayload = {
      user_id: this.props.user.id,
      article_id: this.props.id
    }
    let newCount;
    if(this.state.likeButton.props.color == '#E8ECF0'){
      newCount = this.state.likeCount + 1
      this.props.likeClick(formPayload)
      this.setState({
        likeClass: "like-btn-true",
        likeButton: <FontAwesomeIcon color= 'red' prefix="fas" icon="heart" size="2x" />,
        likeCount: newCount
      })
    }else{
      this.props.unlikeClick(formPayload)
      newCount = this.state.likeCount - 1
      this.setState({
        likeClass: "like-btn",
        likeButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>,
        likeCount: newCount
      })
    }
  }

  handleSubmit(formPayload){
    this.props.commentClick(formPayload)
    let newCount = this.state.commentCount + 1
    this.setState({
      commentForm: "",
      commentButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment" size="2x"/>,
      commentCount: newCount
    })
  }

  handleCommentClick(){
    if(this.state.commentButton.props.color == '#E8ECF0'){
      this.setState({
        commentButton: <FontAwesomeIcon color= 'grey' prefix="fas" icon="comment" size="2x" />,
        commentForm: <CommentTile handleSubmit={this.handleSubmit} user={this.props.user} id={this.props.id} group_id={this.props.group_id} handleCommentClick={this.handleCommentClick}/>
      })
    }else{
      this.setState({
        commentButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment" size="2x"/>,
        commentForm: ""
      })
    }
  }



  render(){
    let image;
    if(this.props.image == null){
      image = "http://contrapoderweb.com/wp-content/uploads/2014/10/default-img-400x240.gif"
    }else{
      image = this.props.image
    }
    let title;
    let description;

    if(this.props.user.censored){
      let Filter = require('bad-words')
      let filter = new Filter();

      let list = require('badwords-list')
      let badWordArray = list.array
      filter.addWords(...badWordArray)

      title = filter.clean(this.props.title)
      description = filter.clean(this.props.description)
      console.log("CENSORED")
    }else{
      title = this.props.title
      description = this.props.description
      console.log("NOT CENSORED")
    }

    library.add(faHeart)
    library.add(faComment)
    return (
        <div>
          <br />
          <div className="column" id="article-card">
            <div className="card" id="card-article">
              <div className="index_source">
                  <p>{this.props.source}</p>
                </div>
                <div className="card-divider">
                  <Link to={`${this.props.url}`} target="_blank">{title}</Link><br />
                </div>
                <div className="card-image">
                  <img src={`${image}`} />
                </div>
                <div className="card-section">
              <h6>{description}</h6>
              <div onClick={this.handleCommentClick} className={this.state.commentClass}>
                {this.state.commentButton}&nbsp;{this.state.commentCount}&nbsp;
              </div>
              <div onClick={this.handleLikeClick} className={this.state.likeClass}>
                {this.state.likeButton}&nbsp;{this.state.likeCount}
              </div>
            </div>
            <div className="comment-form">
              {this.state.commentForm}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleShowTile;
