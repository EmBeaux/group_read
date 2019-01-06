import React, { Component } from 'react';
import TextField from '../components/TextField.js'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

class UserPasswordEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null,
      newPassword: "",
      confirmPassword: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNewPassChange = this.handleNewPassChange.bind(this)
    this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    let payload;

    if(this.state.newPassword == this.state.confirmPassword && this.state.newPassword.length >= 6){

       payload = {
        id: this.state.current_user.id,
        password: this.state.newPassword
      }

      fetch(`/api/v1/users/${this.state.current_user.id}`, {
        credentials: 'same-origin',
        method: "put",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
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
        this.setState({error: ""})
        browserHistory.push(`/users/sign_in`)
      })
      .catch(error => console.error('Error:', error));
    } else {
      this.setState({error: "Please make sure fields match!"})
    }
  }

  handleNewPassChange(event){
    this.setState({newPassword: event.target.value})
  }

  handleConfirmPassChange(event){
    this.setState({confirmPassword: event.target.value})
  }

  componentDidMount() {
    fetch("/api/v1/users")
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
      this.setState({current_user: body})
    })
  }

  render() {

    return(
      <div>
        <h5>{this.state.error}</h5>
        <h2 className="group-form-label">Edit Your Password!</h2>
        <form className="callout" id="new-group-wrap" onSubmit={this.handleSubmit}>
          <TextField
            label = "New Pasword"
            content = {this.state.newPassword}
            handleChange = {this.handleNewPassChange}
            name="newPassword"
            className = "group-name-input"
          />
          <TextField
            label = 'Confirm Password Change'
            content = {this.state.confirmPassword}
            handleChange = {this.handleConfirmPassChange}
            name="confirmPassword"
            className = "group-interest-input"
          />
          <input type="submit" className="button-group" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default UserPasswordEdit;
