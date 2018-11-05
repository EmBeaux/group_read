import React, { Component } from 'react';
import { Link } from 'react-router'

class FeaturedTile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      btnClass: "follow-btn",
      followButton: "follow"
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    let formPayload = {
      user_id: this.props.user.id,
      group_id: this.props.featured_id
    }
    this.props.followClick(formPayload)
    this.setState({
      btnClass: "follow-btn-true",
      followButton: "followed"
    })
  }
  render(){
    return (
        <div className="card">
          <div className="index_source">
            <p>{this.props.featured_interest}<span onClick={this.handleClick} className={this.state.btnClass}>&nbsp;{this.state.followButton}</span></p>
          </div>
          <div className="card-divider">
            <Link to={`/groups/${this.props.featured_id}`}>{this.props.featured_name}</Link><br />
          </div>
          <div className="card-section" id="card-description">
            <h6>{this.props.featured_description}</h6>
          </div>
        </div>
    )
  }
}

export default FeaturedTile;
