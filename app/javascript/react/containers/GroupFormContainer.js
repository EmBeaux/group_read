import React, { Component } from 'react';
import TextField from '../components/TextField.js'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

class GroupFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      interest: "",
      description: "",
      error: ""
    }
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleInterestChange = this.handleInterestChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDescriptionChange(event) {
  this.setState({description: event.target.value})
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleInterestChange(event) {
    this.setState({interest: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    let createdGroup;
    if(this.state.name != "" && this.state.description != "" && this.state.interest != "") {
      createdGroup = {
        name: this.state.name,
        interest: this.state.interest,
        description: this.state.description,
      }
    fetch('/api/v1/groups', {
      credentials: 'same-origin',
      method: "post",
      body: JSON.stringify(createdGroup),
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
      browserHistory.push(`/groups/${body.id}`)
    })
    .catch(error => console.error('Error:', error));

    } else {
      this.setState({error: "Please fill out all forms!"})
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <h5>{this.state.error}</h5>
        <form className="callout" onSubmit={this.handleSubmit}>
          <TextField
            label = "Group Name"
            content = {this.state.name}
            handleChange = {this.handleNameChange}
            name="name"
          />
          <TextField
            label = "Interest of Group"
            content = {this.state.interest}
            handleChange = {this.handleInterestChange}
            name="interest"
          />
          <TextField
            label = "Description of Group"
            content = {this.state.description}
            handleChange = {this.handleDescriptionChange}
            name="description"
          />
          <input type="submit" className="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
  }
}

export default GroupFormContainer;
