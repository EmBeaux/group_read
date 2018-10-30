import React from 'react'
import ReactDom from 'react-dom'
import { Route, IndexRoute, Router, browserHistory, Link } from 'react-router'
import ArticleShowContainer from '../containers/ArticleShowContainer.js'

export const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={ArticleShowContainer}/>
      </Router>
    </div>
  )
}

export default App;
