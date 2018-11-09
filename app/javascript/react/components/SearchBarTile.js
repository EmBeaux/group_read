import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UserGroupTile from '../components/UserGroupTile.js';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { browserHistory } from 'react-router'

class SearchBarTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      search: "",
      searchObj: "",
      nameData: []
    }
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.setNameData = this.setNameData.bind(this)
  }

  setNameData(payload){
    this.setState({nameData: payload})
  }

  onChangeSearch(params){
    this.setState({search: params})
  }

  onSearchSubmit(){
    const searchObj = this.state.groups.find(o => o.name == `${this.state.search}`)
    this.setState({searchObj});
    if(searchObj != undefined && searchObj != ""){
        browserHistory.push(`/groups/${searchObj.id}`)
    }
    else {
      console.log("not found")
    }
  }


  componentDidMount() {
    fetch(`/api/v1/groups`)
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
      this.setState({
          groups: body
        })
        let namesObjects = this.state.groups.map(group => group.name);
        this.setNameData(namesObjects)
      })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return(
      <div data-sticky-container>
        <div className="top-bar sticky" data-sticky data-margin-top="0" id="index-search">
          <MuiThemeProvider>
            <SearchBar
              onChange={this.onChangeSearch}
              onRequestSearch={this.onSearchSubmit}
              style={{
                margin: '0 auto',
                maxWidth: 800
              }}
              dataSource={this.state.nameData}
            />
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default SearchBarTile;
