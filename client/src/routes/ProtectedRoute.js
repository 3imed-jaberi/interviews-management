import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../utils/is-auth.util'

//
function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated()
          ?
          (<Component {...props} />)
          :
          (<Redirect to='/login' />)
      )
      }
    />
  )
}

export { ProtectedRoute as default }
