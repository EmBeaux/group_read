import React, { Component } from 'react'

const IndividualCommentTile = (props) => {
  return (
    <div className="comment-wrapper">
      <div className="comment-email">
        <a href={"/users/" + props.user_id}><h6>{props.email}</h6></a>
      </div>
      <div className="comment-text">
        <h5>{props.commentText}</h5>
      </div>
    </div>
  )
}

export default IndividualCommentTile;
