import React, { Component } from 'react';
import TextField from './TextField.js'
import IndividualCommentTile from './IndividualCommentTile'

class CommentTile extends Component {
  constructor(props) {
    super(props);
  this.state = {
    comment: "",
    comments: null
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
  let mappedComments = ["", ""]
  let comments = []
  if(this.state.comments != null){
    this.state.comments.forEach((comment) => {
      if(comment.article_id == this.props.id){
          comments.push(comment)
        }
      })
      mappedComments = comments.map(comment => {
      return(
        <IndividualCommentTile
          key={comment.id}
          commentText={comment.comment}
          email={comment.email}
        />
      )
    })
  }

  let mappedCommentsOrdered = mappedComments.reverse()
    return (
      <div>
        <h5>{this.state.error}</h5>
        <form className="callout" onSubmit={this.handleSubmit}>
          <TextField
          label = "Comment"
          content = {this.state.comment}
          handleChange = {this.handleCommentChange}
          name="comment"
          />
          <input type="submit" className="button" value="Submit"/>
        </form>
        {mappedCommentsOrdered}
      </div>
    )
  }
}

export default CommentTile;
