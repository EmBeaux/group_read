import React, { Component } from 'react';
import { Link } from 'react-router'

class UserGroupTile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      btnClass: "follow-btn",
      followButton: "follow"
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    let formPayload = {
      user_id: this.props.current_user.id,
      group_id: this.props.id
    }
    if(this.state.followButton == "follow"){
      this.props.followClick(formPayload)
      this.setState({
        btnClass: "follow-btn-true",
        followButton: "following"
      })
    }else{
      this.props.unfollowClick(formPayload)
      this.setState({
        btnClass: "follow-btn",
        followButton: "follow"
      })
    }
  }

  componentDidMount(){
    for (let i=0; i < this.props.current_user.memberships.length; i++) {
        if (this.props.current_user.memberships[i].group_id == this.props.id){
            this.setState({followButton: "following"})
          }
        }
      }
  render(){
    return (
      <div className="card">
        <div className="index_source">
          <p>{this.props.interest}<span onClick={this.handleClick} className={this.state.btnClass}>&nbsp;{this.state.followButton}</span></p>
        </div>
        <div className="card-divider">
          <Link to={`/groups/${this.props.id}`} id={this.props.id}>{this.props.name}</Link><br />
        </div>
        <div className="card-section">
          <h6>{this.props.description}</h6>

        </div>
      </div>
    )
  }
}

export default UserGroupTile;
