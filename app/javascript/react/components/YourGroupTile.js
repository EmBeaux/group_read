import React from 'react';
import { Link } from 'react-router'

const YourGroupTile = (props) => {
  let formPayload = {
    user_id: props.user.id,
    group_id: props.id
  }

  let handleClick = () => {
    props.followClick(formPayload)
  }

  let followSpan = <span onClick={handleClick} className="follow-btn">&nbsp;follow</span>

  for (let i=0; i < props.user.memberships.length; i++) {
    if (props.user.memberships[i].group_id == props.id){
        followSpan = ""
    }
  }

  return (
    <div className="card">
      <div className="index_source">
        <p>{props.interest}{followSpan}</p>
      </div>
      <div className="card-divider">
        <Link to={`/groups/${props.id}`}>{props.name}</Link><br />
      </div>
      <div className="card-section">
        <h6>{props.description}</h6>

      </div>
    </div>
  )
}

export default YourGroupTile;
