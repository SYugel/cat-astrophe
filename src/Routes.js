import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Login from './Login'
import CatFeed from './CatFeed/CatFeed'
import FeedConfig from './FeedConfig/FeedConfig'
import IsAuthenticated from './IsAuthenticated'

export const isAuthenticated = () => {
  if (localStorage.getItem('user')) {
    return true
  } else {
    return false
  }
}

class PrivateRoute extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
        }}
      />
    )
  }
}

PrivateRoute = withRouter(PrivateRoute)

export default class Routes extends Component {
  render() {
    const { childProps } = this.props
    return (
      <Fragment>
        <Route component={IsAuthenticated} />

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/feed" component={CatFeed} />
          <PrivateRoute exact path="/config" component={FeedConfig} />
          <PrivateRoute exact path="/" component={CatFeed} />
        </Switch>
      </Fragment>
    )
  }
}
