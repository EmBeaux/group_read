import React from 'react'
import ReactDom from 'react-dom'
import { Route, IndexRoute, Router, browserHistory, Link } from 'react-router'
import ArticleShowContainer from '../containers/ArticleShowContainer.js'
import GroupIndexContainer from '../containers/GroupIndexContainer.js'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={GroupIndexContainer}/>
        <Route path="/groups/:id" component={ArticleShowContainer}/>
      </Router>
    </div>
  )
}

export default App;
