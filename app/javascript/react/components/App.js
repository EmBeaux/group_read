import React from 'react'
// import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'

import ArticleShowContainer from '../containers/ArticleShowContainer.js'
import GroupIndexContainer from '../containers/GroupIndexContainer.js'
import UserShowContainer from '../containers/UserShowContainer.js'
import GroupFormContainer from '../containers/GroupFormContainer.js'

export const App = (props) => {
  return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={GroupIndexContainer} />
          <Route path="/groups/new" component={GroupFormContainer}/>
          <Route path="/groups/:id" component={ArticleShowContainer}/>
          <Route path="/users/:id" component={UserShowContainer}/>
        </Route>
      </Router>
  )
}

export default App;
