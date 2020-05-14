import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actionTypes from './constants'
import * as actions from './asyncActionCreators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Create Account', () => {
    describe('Validation', () => {
        it('should not allow an empty account name', () => {
            const store = mockStore({ accounts: [] })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: 'Account Name is required',
                    openingBalanceValidationMessage: null
                }
            }]

            return store.dispatch(actions.createAccount('', 1.00))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should not allow duplicate account names', () => {
            const store = mockStore({
                accounts: {
                    items: [
                        { id: 1, name: 'Test Account', balance: 0.01 }
                    ]
                }
            })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: 'Account Name Test Account already exists!',
                    openingBalanceValidationMessage: null
                }
            }]

            return store.dispatch(actions.createAccount('Test Account', 1.00))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should disallow no opening balance', () => {
            const store = mockStore({ accounts: [] })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: null,
                    openingBalanceValidationMessage: 'Opening Balance is required'
                }
            }]

            return store.dispatch(actions.createAccount('Foo', ''))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure that opening balance is a number', () => {
            const store = mockStore({ accounts: [] })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: null,
                    openingBalanceValidationMessage: 'Opening Balance must be a number'
                }
            }]

            return store.dispatch(actions.createAccount('Foo', 'bar'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure opening balance is greater than zero', () => {
            const store = mockStore({ accounts: [] })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: null,
                    openingBalanceValidationMessage: 'Opening Balance cannot be less than £0.01'
                }
            }]

            return store.dispatch(actions.createAccount('Foo', '0'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure opening balance is 1000 or less', () => {
            const store = mockStore({ accounts: [] })

            const expectedActions = [{
                type: actionTypes.CREATE_ACCOUNT_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    nameValidationMessage: null,
                    openingBalanceValidationMessage: 'Jeez, I know this is a fake app, but we can\'t give out more than £1,000.00'
                }
            }]

            return store.dispatch(actions.createAccount('Foo', '1000.01'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})

describe('Transfer Funds', () => {
    describe('Validation', () => {
        it('should ensure a from account is selected', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: 'From Account is required',
                    toAccountValidationMessage: null,
                    transferAmountValidationMessage: null
                }
            }]

            return store.dispatch(actions.transferFunds(null, accounts[0], 20.00))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
        it('should ensure a to account is selected', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: 'To Account is required',
                    transferAmountValidationMessage: null
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[1], null, 20.00))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
        it('should ensure transfer amount is set', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: null,
                    transferAmountValidationMessage: 'Transfer Amount is required'
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[0], accounts[1], ''))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure transfer amount is a number', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: null,
                    transferAmountValidationMessage: 'Transfer Amount must be a number'
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[0], accounts[1], 'foo'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure transfer amount is greater than zero', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: null,
                    transferAmountValidationMessage: 'Transfer Amount cannot be less that £0.01'
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[0], accounts[1], '0'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should ensure transfer amount cannot exceed amount available in from account', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: null,
                    transferAmountValidationMessage: 'Insufficent funds in account Current Account.  You can transfer up to £100.00'
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[0], accounts[1], '200.00'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })

        it('should prevent transferring funds between the same account', () => {
            const accounts = [
                { id: 1, name: 'Current Account', balance: 100.00 },
                { id: 2, name: 'Savings Account', balance: 50.00 }
            ]

            const store = mockStore({
                accounts: {
                    items: accounts
                }
            })

            const expectedActions = [{
                type: actionTypes.TRANSFER_FUNDS_VALIDATION_FAILURE,
                validationResult: {
                    isValid: false,
                    fromAccountValidationMessage: null,
                    toAccountValidationMessage: 'You cannot transfer funds to the same account',
                    transferAmountValidationMessage: null
                }
            }]

            return store.dispatch(actions.transferFunds(accounts[0], accounts[0], '50.00'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
        })
    })
})