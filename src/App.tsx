import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Router, Switch } from 'react-router-dom'
import {
  AppBackground,
  AppWrapper,
  GlobalStyles,
  NavArea,
  SpecialRoute,
  TopBar,
} from './components'
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
            <AppWrapper>
              <TopBar />
              <main>
                <NavArea />
                <Switch>
                  <SpecialRoute
                    exact
                    path="/"
                    auth="auth"
                    component={FeedPage}
                  />
                </Switch>
              </main>
            </AppWrapper>
          </SpecialRoute>
        </Switch>
      </AnimatePresence>
    </Router>
  )
}
