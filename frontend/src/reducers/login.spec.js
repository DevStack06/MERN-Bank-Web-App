import deepFreeze from 'deep-freeze'
import login from './login'
import * as actions from '../actions'

describe('login reducer', () => {
    it('should handle REQUEST_LOGIN_SUCCESS', () => {
        const stateBefore = {
            authenticated: false
        }

        const expectedStateAfter = {
            authenticated: true,
            usernameValidationMessage: null,
            passwordValidationMessage: null
        }

        deepFreeze(stateBefore)

        const stateAfter = login(stateBefore, actions.loginSuccessful())

        expect(stateAfter).toEqual(expectedStateAfter)
    })
    
    it('should handle REQUEST_LOGOUT_SUCCESS', () => {
        const stateBefore = {
            authenticated: true
        }

        const expectedStateAfter = {
            authenticated: false,
            usernameValidationMessage: null,
            passwordValidationMessage: null
        }

        deepFreeze(stateBefore)

        const stateAfter = login(stateBefore, actions.logoutSuccessful())

        expect(stateAfter).toEqual(expectedStateAfter)
    })
    
    it('should handle REQUEST_LOGIN_FAILURE', () => {
        const stateBefore = {
            authenticated: true
        }

        const expectedStateAfter = {
            authenticated: false,
            usernameValidationMessage: 'Foo',
            passwordValidationMessage: 'Bar'
        }

        deepFreeze(stateBefore)

        const validationResult = {
            isValid: false,
            usernameValidationMessage: 'Foo',
            passwordValidationMessage: 'Bar'
        }
        const stateAfter = login(stateBefore, actions.loginFailed(validationResult))

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('handles unknown actions', () => {
        const stateBefore = {
            authenticated: true
        }

        const expectedStateAfter = {
            authenticated: true
        }

        deepFreeze(stateBefore)

        const stateAfter = login(stateBefore, {type: 'BOGUS_ACTION'})

        expect(stateAfter).toEqual(expectedStateAfter)
    })
})