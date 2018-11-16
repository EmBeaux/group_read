import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchBarTile from '../components/SearchBarTile'
import UserShowTile from '../components/UserShowTile'

class GroupUserIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      group_users: null
    }
  }


  componentDidMount() {
    let endpoints = [`/api/v1/users`, `/api/v1/groups/${this.props.params.id}/members`]

    let promises = endpoints.map((endpoint) => {
      return fetch(endpoint)
    })

    Promise.all(promises).then((responses) =>{
      let parsedResponses = responses.map((response) => {
        return response.json();
      })
      return Promise.all(parsedResponses)
    })
    .then(responses => {
      this.setState({
        current_user: responses[0],
        group_users: responses[1]
      })
    })
  }

  render() {
    let users = ""
    let theGroup;
    if(this.state.group_users != null && this.state.group_users.length >= 1){
      users = this.state.group_users.map(user => {
        user.groups.forEach((group)=> {
          if(group.id == this.props.params.id){
            theGroup = group
          }
        })
        return(
          <UserShowTile
            email={user.email}
            user_id={user.id}
            key={user.id}
            group={theGroup}
          />
        )
      })
    }else{
      users = "This group has no members!"
    }
    return(
      <div>
        <div className="index-search">
          <SearchBarTile />
        </div>
        <div>
          <h1>{users}</h1>
        </div>
      </div>
    )
  }
}

export default GroupUserIndexContainer;
