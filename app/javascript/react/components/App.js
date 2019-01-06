import React from 'react'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'

import ArticleShowContainer from '../containers/ArticleShowContainer.js'
import UserPasswordEdit from '../containers/UserPasswordEdit.js'
import GroupIndexContainer from '../containers/GroupIndexContainer.js'
import UserShowContainer from '../containers/UserShowContainer.js'
import GroupFormContainer from '../containers/GroupFormContainer.js'
import GroupUserIndexContainer from '../containers/GroupUserIndexContainer.js'

export const App = (props) => {
  return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={GroupIndexContainer} />
          <Route path="/groups/:id/members" component={GroupUserIndexContainer}/>
          <Route path="/groups/new" component={GroupFormContainer}/>
          <Route path="/groups/:id" component={ArticleShowContainer}/>
          <Route path="/users/:id/edit" component={UserPasswordEdit}/>
          <Route path="/users/:id" component={UserShowContainer}/>
        </Route>
      </Router>
  )
}

export default App;
