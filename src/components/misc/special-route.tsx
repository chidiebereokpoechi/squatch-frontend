import { observer } from 'mobx-react'
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { authStore } from '../../stores/auth.store'

type AuthTypes = 'auth' | 'no-auth'

interface Props extends RouteProps {
  auth?: AuthTypes
}

export const SpecialRoute: React.FC<Props> = observer(({ auth, ...props }) => {
  const { user, ready } = authStore

  if (!ready) {
    return <span>Loading...</span>
  }

  if (auth === 'auth' && !user) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { referrer: props.location?.pathname },
        }}
      />
    )
  }

  if (auth === 'no-auth' && user) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { referrer: props.location?.pathname },
        }}
      />
    )
  }

  return <Route {...props} />
})
