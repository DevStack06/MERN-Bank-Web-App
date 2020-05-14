import * as ActionTypes from '../actions/constants'
const transactions = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_TRANSACTIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ActionTypes.RECEIVE_TRANSACTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.response
      })
    default:
      return state
  }
}
export default transactions