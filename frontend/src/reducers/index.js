import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from '../actions/constants'
import login from './login'
import accounts from './accounts'
import transactions from './transactions'

const errorMessage = (state = null, action) => {
  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }
  return state
}

const rootReducer = combineReducers({
  errorMessage,
  routing,
  login,
  accounts,
  transactions
})

export default rootReducer