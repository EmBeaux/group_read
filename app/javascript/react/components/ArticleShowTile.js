import React from 'react';
import { Link } from 'react-router'

const ArticleShowTile = (props) => {
  let image;
  if(props.image == null){
    image = "http://contrapoderweb.com/wp-content/uploads/2014/10/default-img-400x240.gif"
  }else{
    image = props.image
  }


  return (
      <div>
        <br />
        <div className="column" id="article-card">
          <div className="card" id="card-article">
            <div className="index_source">
              <p>{props.source}</p>
            </div>
            <div className="card-divider">
              <Link to={`${props.url}`} target="_blank">{props.title}</Link><br />
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

export default ArticleShowTile;
