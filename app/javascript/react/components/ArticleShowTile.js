import React, { Component } from 'react';
import { Link } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, far, fas } from '@fortawesome/free-solid-svg-icons'

class ArticleShowTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeClass: "like-btn",
      likeButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>,
      count: this.props.likeCount
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    console.log("componentDidMount: " + this.props.user)
    if(this.props.user != null){
      for (let i=0; i < this.props.user.likes.length; i++) {
        if (this.props.user.likes[i].article_id == this.props.id){
          this.setState({
            likeClass: "like-btn-true",
            likeButton: <FontAwesomeIcon color= 'red' prefix="fas" icon="heart" size="2x"/>
          })
        }
      }
    }
  }


  handleClick(){
    let formPayload = {
      user_id: this.props.user.id,
      article_id: this.props.id
    }
    let newCount;
    if(this.state.likeButton.props.color == '#E8ECF0'){
      newCount = this.state.count + 1
      this.props.likeClick(formPayload)
      this.setState({
        likeClass: "like-btn-true",
        likeButton: <FontAwesomeIcon color= 'red' prefix="fas" icon="heart" size="2x" />,
        count: newCount
      })
    }else{
      this.props.unlikeClick(formPayload)
      newCount = this.state.count - 1
      this.setState({
        likeClass: "like-btn",
        likeButton: <FontAwesomeIcon color= '#E8ECF0' prefix="far" icon="heart" size="2x"/>,
        count: newCount
      })
    }
  }


  render(){
    let image;
    if(this.props.image == null){
      image = "http://contrapoderweb.com/wp-content/uploads/2014/10/default-img-400x240.gif"
    }else{
      image = this.props.image
    }


    library.add(faHeart)
console.log("render: " + this.props.user)
    return (
        <div>
          <br />
          <div className="column" id="article-card">
            <div className="card" id="card-article">
              <div className="index_source">
                  <p>{this.props.source}</p>
                </div>
                <div className="card-divider">
                  <Link to={`${this.props.url}`} target="_blank">{this.props.title}</Link><br />
                </div>
                <div className="card-image">
                  <img src={`${image}`} />
                </div>
                <div className="card-section">
              <h6>{this.props.description}<span onClick={this.handleClick} className={this.state.likeClass}>&nbsp;{this.state.likeButton}<span className="like-count">{this.state.count}</span></span></h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleShowTile;
