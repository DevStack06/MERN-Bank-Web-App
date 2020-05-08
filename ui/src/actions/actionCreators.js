import * as types from './constants'

export const resetErrorMessage = () => ({
    type: types.RESET_ERROR_MESSAGE
})

export const requestLogin = credentials => ({
    type: types.REQUEST_LOGIN,
    credentials
})

export const loginSuccessful = () => ({
    type: types.REQUEST_LOGIN_SUCCESS
})

export const loginFailed = validationResult => ({
    type: types.REQUEST_LOGIN_FAILURE,
    validationResult
})

export const requestLogout = () => ({
    type: types.REQUEST_LOGOUT
})

export const logoutSuccessful = () => ({
    type: types.REQUEST_LOGOUT_SUCCESS
})

export const requestAccounts = () => ({
    type: types.REQUEST_ACCOUNTS
})

export const receiveAccounts = (accounts) => ({
    type: types.RECEIVE_ACCOUNTS,
    accounts
})

export const requestTransactions = accountId => ({
    type: types.REQUEST_TRANSACTIONS
})

export const receiveTransactions = (transactions) => ({
    type: types.RECEIVE_TRANSACTIONS,
    transactions
})

export const showNewAccountForm = () => ({
    type: types.SHOW_NEW_ACCOUNTS_FORM
})

export const hideNewAccountForm = () => ({
    type: types.HIDE_NEW_ACCOUNTS_FORM
})

export const invalidCreateAccountRequest = validationResult => ({
    type: types.CREATE_ACCOUNT_VALIDATION_FAILURE,
    validationResult
})

export const accountCreated = account => ({
    type: types.ACCOUNT_CREATED,
    account
})

export const showTransferFunds = () => ({
    type: types.SHOW_TRANSFER_FUNDS
})

export const hideTransferFunds = () => ({
    type: types.HIDE_TRANSFER_FUNDS
})

export const invalidTransferFundsRequest = validationResult => ({
    type: types.TRANSFER_FUNDS_VALIDATION_FAILURE,
    validationResult
})

export const transferFundsComplete = () => ({
    type: types.TRANSFER_FUNDS_COMPLETE
})

export const refreshAccountBalance = (accountId, newBalance) => ({
    type: types.UPDATE_ACCOUNT_BALANCE,
    accountId,
    newBalance
})