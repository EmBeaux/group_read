import React from 'react';
import { Link } from 'react-router'

const TrendingFeedsTile = (props) => {
  let image;
    if(props.image == null){
      image = "http://contrapoderweb.com/wp-content/uploads/2014/10/default-img-400x240.gif"
    }else{
      image = props.image
    }

  return (
    <div>
      <br />
      <div className="column">
        <div className="card" id="article-card">
          <p className="index_source">{props.source}</p>
          <div className="card-divider">
            <Link to={`${props.url}`}>{props.title}</Link><br />
          </div>
          <div className="card-image">
            <img src={`${image}`} />
          </div>

          <div className="card-section">
            <h6>{props.description}</h6>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TrendingFeedsTile;
