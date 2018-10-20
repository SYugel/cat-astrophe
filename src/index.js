import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import App from './App'
import { ConnectedRouter } from 'react-router-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import './app.scss'

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
