import React, { Component } from 'react';
import TextField from './TextField.js'
import IndividualCommentTile from './IndividualCommentTile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {far, faCaretUp } from '@fortawesome/free-solid-svg-icons'

class CommentTile extends Component {
  constructor(props) {
    super(props);
  this.state = {
    comment: "",
    comments: null,
    uparrow: null
  }
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleClear = this.handleClear.bind(this)
  this.handleCommentChange = this.handleCommentChange.bind(this)
}

handleCommentChange(event){
  this.setState({comment: event.target.value})
}


handleClear(){
  this.setState({
    comment: "",
    comments: null
  })
}
handleSubmit(event){
  event.preventDefault()
  let payload = {
    user_id: this.props.user.id,
    article_id: this.props.id,
    comment: this.state.comment
  }
  this.props.handleSubmit(payload)
  this.handleClear()
}

componentDidMount(){
  fetch(`/api/v1/comments/${this.props.group_id}`)
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
    this.setState({comments: body})
  })
}


render(){
  let uparrow;

  library.add(faCaretUp)
  let mappedComments = ["", ""]
  let comments = []
  let replies = []
  if(this.state.comments != null){
    this.state.comments.forEach((comment) => {
      if(comment.article_id == this.props.id && comment.reply == null){
          comments.push(comment)
        }else if(comment.article_id == this.props.id && comment.reply != null){
          replies.push(comment)
        }
      })
      mappedComments = comments.map(comment => {
        let emailArr = comment.email.split('@')
        let email = emailArr[0]
      return(
        <IndividualCommentTile
          article_id={comment.article_id}
          replies={replies}
          user_id={comment.user_id}
          key={comment.id}
          commentText={comment.comment}
          email={email}
          comment_id={comment.id}
          replyCount={comment.replycount}
        />
      )
    })
  }


  let mappedCommentsOrdered = mappedComments.reverse()
    return (
      <div>
        <h5>{this.state.error}</h5>
        <form className="comment-form" onSubmit={this.handleSubmit}>
          <TextField
          label = "Add a new Comment!"
          content = {this.state.comment}
          handleChange = {this.handleCommentChange}
          name="comment"
          id="comment"
          />
          <input type="submit" id="comment-submit" value="Submit"/>
        </form>
        <h5>Comments:</h5>
        {mappedCommentsOrdered}
        <div className="collapse-arrow">
          <FontAwesomeIcon color= 'grey' prefix="fas" icon="caret-up" size="2x" onClick={this.props.handleCommentClick}/>
        </div>
      </div>
    )
  }
}

export default CommentTile;
