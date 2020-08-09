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
import { HomePage, LogInPage, SignUpPage } from './pages'
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
            path="/log-in"
            auth="no-auth"
            component={LogInPage}
          />
          <SpecialRoute
            exact
            path="/sign-up"
            auth="no-auth"
            component={SignUpPage}
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
                    component={HomePage}
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
