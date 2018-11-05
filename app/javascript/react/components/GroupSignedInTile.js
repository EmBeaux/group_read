import React from 'react';
import YourGroupTile from './YourGroupTile.js'
import FeaturedTile from './FeaturedTile.js'

const GroupSignedInTile = (props) => {


  return (
    <div className="grid-x small-up-1 medium-up-3">
      <div className="cell small-6" id="your-group-tile">
        <YourGroupTile
          key={props.id}
          id={props.id}
          name={props.name}
          description={props.description}
          interest={props.interest}
          followClick={props.followClick}
          unfollowClick={props.unfollowClick}
          user={props.user}
        />
      </div>

      <div className="cell small-6" id="featured-group-tile">
        <FeaturedTile
          featured_name={props.featured_name}
          featured_key={props.featured_id}
          featured_id={props.featured_id}
          featured_description={props.featured_description}
          featured_interest={props.featured_interest}
          followClick={props.followClick}
          user={props.user}
        />
      </div>
    </div>
  )
}

export default GroupSignedInTile;
