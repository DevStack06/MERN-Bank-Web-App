import * as actions from './index'

describe('action creators', () => {
    it('should create reset error message', () => {
        const expectedAction = {
            type: 'RESET_ERROR_MESSAGE'
        }

        const actualAction = actions.resetErrorMessage()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create request login action', () => {
        const credentials = {
            username: 'bob',
            password: 'password1'
        }

        const expectedAction = {
            type: 'REQUEST_LOGIN',
            credentials
        }

        const actualAction = actions.requestLogin(credentials)

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create login successful action', () => {
        const expectedAction = {
            type: 'REQUEST_LOGIN_SUCCESS'
        }
        const actualAction = actions.loginSuccessful()
        expect(actualAction).toEqual(expectedAction)
    })

    it('should create login failed action', () => {
        const validationResult = {
            isValid: false,
            usernameValidationMessage: 'Username is required',
            passwordValidationMessage: 'Password is required'
        }

        const expectedAction = {
            type: 'REQUEST_LOGIN_FAILURE',
            validationResult
        }

        const actualAction = actions.loginFailed(validationResult)

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create request logout action', () => {
        const expectedAction = {
            type: 'REQUEST_LOGOUT'
        }

        const actualAction = actions.requestLogout()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create logout successful action', () => {
        const expectedAction = {
            type: 'REQUEST_LOGOUT_SUCCESS'
        }

        const actualAction = actions.logoutSuccessful()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create show new account form action', () => {
        const expectedAction = {
            type: 'SHOW_NEW_ACCOUNTS_FORM'
        }

        const actualAction = actions.showNewAccountForm()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create hide new account form action', () => {
        const expectedAction = {
            type: 'HIDE_NEW_ACCOUNTS_FORM'
        }

        const actualAction = actions.hideNewAccountForm()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create show transfer funds action', () => {
        const expectedAction = {
            type: 'SHOW_TRANSFER_FUNDS'
        }

        const actualAction = actions.showTransferFunds()

        expect(actualAction).toEqual(expectedAction)
    })

    it('should create hide transfer funds action', () => {
        const expectedAction = {
            type: 'HIDE_TRANSFER_FUNDS'
        }

        const actualAction = actions.hideTransferFunds()

        expect(actualAction).toEqual(expectedAction)
    })
})