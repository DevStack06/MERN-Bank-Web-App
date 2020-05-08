import deepFreeze from 'deep-freeze'
import accounts from './accounts'
import * as actions from '../actions'

describe('accounts reducer', () => {
    it('should have showTransferFundsButton set to false by default', () => {
        const defaultState = accounts(undefined, {})

        const expectedState = { isFetching: false, showTransferFundsButton: false, items: [] }

        expect(defaultState).toEqual(expectedState)
    })

    it('should handle REQUEST_ACCOUNTS', () => {
        const stateBefore = {}

        const expectedStateAfter = {
            isFetching: true
        }

        deepFreeze(stateBefore)

        const stateAfter = accounts(stateBefore, { type: 'REQUEST_ACCOUNTS'})

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    describe('RECEIVE_ACCOUNTS', () => {
        it('should set showTransferFundsButton to false if there is less than 2 accounts', () => {
            const stateBefore = {
                isFetching: false
            }

            const items = [
                { id: 1, name: 'Solo Account', balance: 123.45 }
            ]

            const expectedStateAfter = {
                isFetching: false,
                showTransferFundsButton: false,
                items
            }

            deepFreeze(stateBefore)

            const stateAfter = accounts(stateBefore, {
                type: 'RECEIVE_ACCOUNTS',
                response: items
            })

            expect(stateAfter).toEqual(expectedStateAfter)
        })

        it('should set showTransferFundsButton to true if there is more than 1 accounts', () => {
            const items = [
                { id: 1, name: 'Solo Account', balance: 123.45 },
                { id: 2, name: 'My Second Account', balance: 543.21 }
            ]

            const expectedStateAfter = {
                isFetching: false,
                showTransferFundsButton: true,
                items
            }

            const stateAfter = accounts(undefined, {
                type: 'RECEIVE_ACCOUNTS',
                response: items
            })

            expect(stateAfter).toEqual(expectedStateAfter)
        })
    })

    it('should handle SHOW_NEW_ACCOUNTS_FORM', () => {
        const stateBefore = {}

        const expectedStateAfter = {
            showNewAccountForm: true
        }

        deepFreeze(stateBefore)

        const stateAfter = accounts(stateBefore, actions.showNewAccountForm())

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('should handle HIDE_NEW_ACCOUNTS_FORM', () => {
        const stateBefore = {
            showNewAccountForm: true
        }

        const expectedStateAfter = {
            showNewAccountForm: false,
            nameValidationMessage: null,
            openingBalanceValidationMessage: null
        }

        deepFreeze(stateBefore)

        const stateAfter = accounts(stateBefore, actions.hideNewAccountForm())

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('should handle CREATE_ACCOUNT_VALIDATION_FAILURE', () => {
        const stateBefore = {}

        const validationResult = {
            isValid: false,
            nameValidationMessage: 'Name validation message',
            openingBalanceValidationMessage: 'Opening Balance validation message'
        }

        const expectedStateAfter = {
            nameValidationMessage: 'Name validation message',
            openingBalanceValidationMessage: 'Opening Balance validation message'
        }

        deepFreeze(stateBefore)

        const stateAfter = accounts(stateBefore, actions.invalidCreateAccountRequest(validationResult))

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    describe('CREATE_ACCOUNT_SUCCESS', () => {
        it('should showTransferFundsButton to true if there are multiple accounts', () => {
            const stateBefore = {
                items: [
                    { id: 1, name: 'My First Account', balance: 50.00 }
                ]
            }

            deepFreeze(stateBefore)

            const expectedStateAfter = {
                items: [
                    { id: 1, name: 'My First Account', balance: 50.00 },
                    { id: 2, name: 'My Second Account', balance: 100.00 }
                ],
                showNewAccountForm: false,
                showTransferFundsButton: true
            }

            const createAccountSuccess = {
                type: 'CREATE_ACCOUNT_SUCCESS',
                response: {
                    id: 2,
                    name: 'My Second Account',
                    balance: 100.00
                }
            }

            const stateAfter = accounts(stateBefore, createAccountSuccess)

            expect(stateAfter).toEqual(expectedStateAfter)
        })

        it('should showTransferFundsButton to false if there is only one account', () => {
            const stateBefore = {
                items: []
            }

            deepFreeze(stateBefore)

            const expectedStateAfter = {
                items: [
                    { id: 1, name: 'My First Account', balance: 50.00 }
                ],
                showNewAccountForm: false,
                showTransferFundsButton: false
            }

            const createAccountSuccess = {
                type: 'CREATE_ACCOUNT_SUCCESS',
                response: {
                    id: 1,
                    name: 'My First Account',
                    balance: 50.00
                }
            }

            const stateAfter = accounts(stateBefore, createAccountSuccess)

            expect(stateAfter).toEqual(expectedStateAfter)
        })
    })

    it('handles SHOW_TRANSFER_FUNDS', () => {
        const stateBefore = {}

        deepFreeze(stateBefore)

        const expectedStateAfter = {
            showTransferFunds: true
        }

        const stateAfter = accounts(stateBefore, actions.showTransferFunds())

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('handles HIDE_TRANSFER_FUNDS', () => {
        const stateBefore = {}

        deepFreeze(stateBefore)

        const expectedStateAfter = {
            showTransferFunds: false,
            fromAccountValidationMessage: null,
            toAccountValidationMessage: null,
            transferAmountValidationMessage: null
        }

        const stateAfter = accounts(stateBefore, actions.hideTransferFunds())

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('handles TRANSFER_FUNDS_VALIDATION_FAILURE', () => {
        const stateBefore = {
            showTransferFunds: true
        }

        deepFreeze(stateBefore)

        const validationResult = {
            isValid: false,
            fromAccountValidationMessage: 'foo',
            toAccountValidationMessage: 'bar',
            transferAmountValidationMessage: 'baz'
        }

        const expectedStateAfter = {
            showTransferFunds: true,
            fromAccountValidationMessage: 'foo',
            toAccountValidationMessage: 'bar',
            transferAmountValidationMessage: 'baz'
        }

        const stateAfter = accounts(stateBefore, actions.invalidTransferFundsRequest(validationResult))

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('handles UPDATE_ACCOUNT_BALANCE_SUCCESS', () => {
        const stateBefore = {
            items: [
                { id: 1, name: 'First Account', balance: 100.00 },
                { id: 2, name: 'Second Account', balance: 200.00 },
                { id: 3, name: 'Third Account', balance: 300.00 }
            ]
        }

        deepFreeze(stateBefore)

        const expectedStateAfter = {
            items: [
                { id: 1, name: 'First Account', balance: 100.00 },
                { id: 2, name: 'Second Account', balance: 250.00 },
                { id: 3, name: 'Third Account', balance: 300.00 }
            ]
        }

        const action = {
            type: 'UPDATE_ACCOUNT_BALANCE_SUCCESS',
            response: {
                id: 2,
                name: 'Second Account',
                balance: 250.00
            }
        }

        const stateAfter = accounts(stateBefore, action)

        expect(stateAfter).toEqual(expectedStateAfter)
    })

    it('handles unknown actions', () => {
        const stateBefore = {
            items: [
                { id: 1, name: 'First Account', balance: 100.00 },
                { id: 2, name: 'Second Account', balance: 250.00 },
                { id: 3, name: 'Third Account', balance: 300.00 }
            ]
        }

        const expectedStateAfter = {
            items: [
                { id: 1, name: 'First Account', balance: 100.00 },
                { id: 2, name: 'Second Account', balance: 250.00 },
                { id: 3, name: 'Third Account', balance: 300.00 }
            ]
        }

        deepFreeze(stateBefore)

        const stateAfter = accounts(stateBefore, {type: 'BOGUS_ACTION'})

        expect(stateAfter).toEqual(expectedStateAfter)
    })
})