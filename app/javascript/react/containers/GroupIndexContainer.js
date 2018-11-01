import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import GroupSignedInTile from '../components/GroupSignedInTile.js'
import GroupSignedOutTile from '../components/GroupSignedOutTile.js'

  class GroupIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    fetch('/api/v1/users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
        this.setState({user: body})
    })
  }

  render() {
    let tile;

    if (this.state.user) {
      tile = <GroupSignedInTile />
    } else {
      tile = <GroupSignedOutTile />
    }
    return(
      <div>
        {tile}
      </div>
    )
  }
}

export default GroupIndexContainer;
