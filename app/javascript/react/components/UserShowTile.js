import React, { Component } from 'react'
import { Link } from 'react-router'

const UserShowTile = (props) => {

  return (
    <div>
      <br />
      <div className="column">
        <div className="card" id="user-card">
          <div className="index_source">
            <Link to={`/groups/${props.group.id}`}>{props.group.name}</Link>
          </div>
          <div className="card-divider">
            <Link to={`/users/${props.user_id}`}>{props.email}</Link><br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserShowTile;
