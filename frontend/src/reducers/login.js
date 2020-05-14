import * as ActionTypes from '../actions/constants'

const login = (state = {
    authenticated: false
}, action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LOGIN:
            return state;
        case ActionTypes.REQUEST_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                usernameValidationMessage: null,
                passwordValidationMessage: null
            })
        case ActionTypes.REQUEST_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
                usernameValidationMessage: null,
                passwordValidationMessage: null
            })
        case ActionTypes.REQUEST_LOGIN_FAILURE:
            return Object.assign({}, state, {
                authenticated: false,
                usernameValidationMessage: action.validationResult.usernameValidationMessage,
                passwordValidationMessage: action.validationResult.passwordValidationMessage
            })
        default:
            return state
    }
}

export default login