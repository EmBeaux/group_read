import React, { Component } from 'react';
import { Link } from 'react-router'
import IndividualCommentTile from '../components/IndividualCommentTile'
import TextField from '../components/TextField'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas, faComment } from '@fortawesome/free-solid-svg-icons'

class CommentReplyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentClass: "reply-comment-btn",
      commentButton:  <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment"/>,
      replyCount: this.props.replyCount,
      comment: "",
      replies: null,
      formClass: "reply-form-wrapper"
    }
    this.handleCommentClick = this.handleCommentClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
  }

  handleCommentChange(event){
    this.setState({comment: event.target.value})
  }

  // handleSubmit(formPayload){
  //   let newCount = this.state.replyCount + 1
  //   this.setState({
  //     commentForm: "",
  //     commentButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment"/>,
  //     replyCount: newCount
  //   })
  // }

  handleCommentClick(){
    if(this.state.commentButton.props.color == '#E8ECF0'){
      this.setState({
        commentButton: <FontAwesomeIcon color= 'grey' prefix="fas" icon="comment"/>,
        formClass: "reply-form-wrapper-show"
      })
    }else{
      this.setState({
        commentButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="comment"/>,
        formClass: "reply-form-wrapper"
      })
    }
  }

  handleClear(){
    this.setState({
      comment: "",
      comments: null
    })
  }


  componentDidMount(){
    this.setState({replies: this.props.replies})
  }

  handleSubmit(event){
    event.preventDefault()

    let payload = {
      comment: this.state.comment,
        user_id: this.props.user_id,
        article_id: this.props.article_id,
        reply_id: this.props.comment_id
      }

    fetch('api/v1/comments', {
      credentials: 'same-origin',
      method: "post",
      body: JSON.stringify(payload),
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

    this.handleClear()
  }


  render(){
    library.add(faComment)

    let mappedReplies = ["", ""]
    let replies = []
    let moreReplies = [];
    if(this.state.replies != null){
      this.state.replies.forEach((reply) => {
        if(reply.reply.id == this.props.comment_id){
            replies.push(reply)
          }else{
            moreReplies.push(reply)
          }
        })
        mappedReplies = replies.map(reply => {
          let emailArr = reply.email.split('@')
          let email = emailArr[0]
        return(
          <IndividualCommentTile
          replies={moreReplies}
          user_id={reply.user_id}
          key={reply.id}
          commentText={reply.comment}
          email={email}
          className={"reply-indv-comment"}
          comment_id={reply.id}
          replyCount={reply.replycount}
          />
        )
      })
    }


    let mappedCommentsOrdered = mappedReplies.reverse()
      return (
        <div>
        <span onClick={this.handleCommentClick} className={this.state.commentClass}>&nbsp;{this.state.commentButton}&nbsp;{this.state.replyCount}</span>
          <div className={this.state.formClass}>
            <h5>{this.state.error}</h5>
            <form className="reply-form" onSubmit={this.handleSubmit}>
              <TextField
              label = "Add a Reply!"
              content = {this.state.comment}
              handleChange = {this.handleCommentChange}
              name="comment"
              id="comment"
              />
              <span>
                <input type="submit" id="reply-submit" value="Submit"/>
              </span>
            </form>
            {mappedCommentsOrdered}
          </div>
        </div>
      )
    }
  }

export default CommentReplyContainer;
