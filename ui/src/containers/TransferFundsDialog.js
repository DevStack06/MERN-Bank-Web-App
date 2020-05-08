import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import { hideTransferFunds, transferFunds } from '../actions'

class TransferFundsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromAccount: null,
            toAccount: null
        }
    }

    handleFromAccountChange = (event, index, value) => this.setState({ fromAccount: value })
    handleToAccountChange = (event, index, value) => this.setState({ toAccount: value })

    submitRequest() {
        const { dispatch } = this.props

        let transferAmount = this.refs.transferAmount.input.value

        dispatch(transferFunds(this.state.fromAccount, this.state.toAccount, transferAmount))
    }

    cancel() {
        const { dispatch } = this.props
        dispatch(hideTransferFunds())
    }

    render() {
        const { accounts, showTransferFunds, fromAccountValidationMessage, toAccountValidationMessage, transferAmountValidationMessage } = this.props

        const actions = [
            <FlatButton
                label="Transfer"
                primary={true}
                onTouchTap={() => this.submitRequest()}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.cancel()}
            />
        ]

        return (
            <Dialog
                title="Transfer Funds"
                actions={actions}
                modal={false}
                open={showTransferFunds}
                onRequestClose={() => this.cancel()}
            >

                <div>
                    <SelectField
                        floatingLabelText="From Account"
                        value={this.state.fromAccount}
                        onChange={this.handleFromAccountChange}
                        errorText={fromAccountValidationMessage}
                    >
                        {
                            accounts.map(account => <MenuItem key={account.id} value={account} primaryText={account.name} />)
                        }
                    </SelectField>
                </div>
                <div>
                    <SelectField
                        floatingLabelText="To Account"
                        value={this.state.toAccount}
                        onChange={this.handleToAccountChange}
                        errorText={toAccountValidationMessage}
                    >
                        {
                            accounts.map(account => <MenuItem key={account.id} value={account} primaryText={account.name} />)
                        }
                    </SelectField>
                </div>
                <div>
                    <TextField ref="transferAmount" hintText="Amount" errorText={transferAmountValidationMessage} />
                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    const { accounts } = state
    return {
        accounts: accounts.items,
        showTransferFunds: accounts.showTransferFunds,
        fromAccountValidationMessage: accounts.fromAccountValidationMessage,
        toAccountValidationMessage: accounts.toAccountValidationMessage,
        transferAmountValidationMessage: accounts.transferAmountValidationMessage
    }
}

export default connect(mapStateToProps)(TransferFundsDialog)