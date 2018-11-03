import React from 'react';
import { Link } from 'react-router'

const YourGroupTile = (props) => {

let followSpan = <span onClick={handleClick}>&nbsp;follow</span>

  props.user.memberships.forEach(function(membership){
    if(membership.group_id == props.id){
      followSpan = ""
    }
  })
let formPayload = {
  user_id: props.user.id,
  group_id: props.id
}
let handleClick = () => {
  props.followClick(formPayload)
}

  return (
    <div className="card">
      <div className="index_source">
        <p>{props.interest}</p>
      </div>
      <div className="card-divider">
        <Link to={`/groups/${props.id}`}>{props.name}</Link><br />
      </div>
      <div className="card-section">
        <h6>{props.description}{followSpan}</h6>

      </div>
    </div>
  )
}

export default YourGroupTile;
