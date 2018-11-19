import React, { Component } from 'react'
import CommentReplyContainer from '../containers/CommentReplyContainer.js'

const IndividualCommentTile = (props) => {
  let className = "comment-wrapper"
  if(props.className != undefined){
    className = props.className
  }
  return (
    <div className={className}>
      <div className="comment-email">
        <a href={"/users/" + props.user_id}><h6>{props.email}</h6></a>
      </div>
      <div className="comment-text">
        <h5>{props.commentText}</h5>
      </div>
      <div className="reply-wrap">
        <CommentReplyContainer comment_id={props.comment_id} replyCount={props.replyCount} replies={props.replies}/>
      </div>
    </div>
  )
}

export default IndividualCommentTile;
