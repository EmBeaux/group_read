import React from 'react';
import { Link } from 'react-router'

const ArticleShowTile = (props) => {
  return (
      <div>
        <br />
        <div className="column">
          <div className="card">

            <p className="index_source">{props.source}</p>
            <div className="card-divider">
              <Link to={`${props.url}`}>{props.title}</Link><br />
              <img src={`${props.image}`} />
            </div>

            <div className="card-section">
              <h6>{props.description}</h6>
            </div>

          </div>
        </div>
      </div>
  )
}

export default ArticleShowTile;
