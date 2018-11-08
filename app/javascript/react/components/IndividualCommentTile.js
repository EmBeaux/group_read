import React, { Component } from 'react'

const IndividualCommentTile = (props) => {
  return (
    <div>
      <h6>{props.email}</h6>
      <h5>{props.commentText}</h5>
    </div>
  )
}

export default IndividualCommentTile;
