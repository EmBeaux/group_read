import React from 'react'
import ReactDom from 'react-dom'
import { Route, IndexRoute, Router, browserHistory, Link } from 'react-router'
import ArticleShowContainer from '../containers/ArticleShowContainer.js'
import GroupIndexContainer from '../containers/GroupIndexContainer.js'
import UserShowContainer from '../containers/UserShowContainer.js'
import GroupFormContainer from '../containers/GroupFormContainer.js'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={GroupIndexContainer}/>
        <Route path="/groups" component={GroupIndexContainer}/>
        <Route path="/groups/new" component={GroupFormContainer}/>
        <Route path="/groups/:id" component={ArticleShowContainer}/>
        <Route path="/users/:id" component={UserShowContainer}/>
      </Router>
    </div>
  )
}

export default App;
