import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

const middleware = [thunkMiddleware, routerMiddleware(history)]
const enhancers = []
const initialState = {}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
