import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { AppBackground, GlobalStyles, SpecialRoute, TopBar } from './components'
import { FeedPage, LoginPage } from './pages'
import { history } from './util'

export const App: React.FC = () => {
  return (
    <Router history={history}>
      <GlobalStyles />
      <AppBackground />
      <AnimatePresence>
        <Switch>
          <SpecialRoute
            exact
            path="/login"
            auth="no-auth"
            component={LoginPage}
          />
          <SpecialRoute path="/" auth="auth">
            <TopBar />
            <Switch>
              <SpecialRoute exact path="/" auth="auth" component={FeedPage} />
            </Switch>
          </SpecialRoute>
        </Switch>
      </AnimatePresence>
    </Router>
  )
}
