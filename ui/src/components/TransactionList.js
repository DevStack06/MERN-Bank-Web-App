import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import moment from 'moment'
import formatMoney from '../formatMoney'

const formatDisplayAmount = (amount) => {
    return amount ? formatMoney(amount) : ' - '
}

const TransactionList = ({
    transactions
}) => (
        <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>Debit</TableHeaderColumn>
                    <TableHeaderColumn>Credit</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    transactions.map(transaction => {
                        return (
                            <TableRow key={transaction.id}>
                                <TableRowColumn>{moment(transaction.date).fromNow()}</TableRowColumn>
                                <TableRowColumn>{transaction.description}</TableRowColumn>
                                <TableRowColumn>{formatDisplayAmount(transaction.debit)}</TableRowColumn>
                                <TableRowColumn>{formatDisplayAmount(transaction.credit)}</TableRowColumn>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )

export default TransactionList