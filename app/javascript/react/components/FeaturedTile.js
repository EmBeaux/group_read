import React from 'react';
import { Link } from 'react-router'

const FeaturedTile = (props) => {
  let formPayload = {
    user_id: props.user.id,
    group_id: props.featured_id
  }
  let handleClick = () => {
    props.followClick(formPayload)
  }

  return (
      <div className="card">
        <div className="index_source">
          <p>{props.featured_interest}</p>
        </div>
        <div className="card-divider">
          <Link to={`/groups/${props.featured_id}`}>{props.featured_name}</Link><br />
        </div>
        <div className="card-section" id="card-description">
          <h6>{props.featured_description}<span onClick={handleClick}>&nbsp;follow</span></h6>
        </div>
      </div>
  )
}

export default FeaturedTile;
