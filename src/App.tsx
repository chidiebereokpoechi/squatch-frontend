import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { history } from './util/history'

export const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <span>Hehe</span>
        </Route>
      </Switch>
    </Router>
  )
}
