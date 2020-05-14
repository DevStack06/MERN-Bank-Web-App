import deepFreeze from 'deep-freeze'
import transactions from './transactions'

describe('transactions reducer', () => {
    it('handles REQUEST_TRANSACTIONS', () => {
        const stateBefore = {
            isFetching: false,
            items: []
        }

        const expectedStateAfter = {
            isFetching: true,
            items: []
        }

        deepFreeze(stateBefore)

        const stateAfter = transactions(stateBefore, { type: 'REQUEST_TRANSACTIONS', accountId: 1 })

        expect(stateAfter).toEqual(expectedStateAfter)
    })
    
    it('handles RECEIVE_TRANSACTIONS', () => {
        const stateBefore = {
            isFetching: true,
            items: []
        }

        const items = [
            { id: 1, date: new Date(), description: 'My transaction description', debit: 100.00, credit: null, accountId: 1 }
        ]

        deepFreeze(stateBefore)

        const expectedStateAfter = {
            isFetching: false,
            items
        }

        const action = {
            type: 'RECEIVE_TRANSACTIONS',
            response: items
        }

        const stateAfter = transactions(stateBefore, action)

        expect(stateAfter).toEqual(expectedStateAfter)
    })
    
    it('handles unknown actions', () => {
        const stateBefore = {
            items: []
        }

        const expectedStateAfter = {
            items: []
        }

        deepFreeze(stateBefore)

        const stateAfter = transactions(stateBefore, {type: 'BOGUS_ACTION'})

        expect(stateAfter).toEqual(expectedStateAfter)
    })
})