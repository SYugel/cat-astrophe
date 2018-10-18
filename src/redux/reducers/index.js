import { combineReducers } from 'redux'
import catfeed from './catfeed'
import auth from './auth'

export default combineReducers({
  catfeed,
  auth
})
