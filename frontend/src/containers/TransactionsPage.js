import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import Subheader from "material-ui/Subheader";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import { fetchTransactions } from "../actions";
import formatMoney from "../formatMoney";
import TransactionList from "../components/TransactionList";

class TransactionsPage extends Component {
  componentDidMount() {
    const { dispatch, authenticated, accountId } = this.props;
    if (!authenticated) {
      browserHistory.push("/");
    }
    dispatch(fetchTransactions(accountId));
  }

  goToAccounts() {
    browserHistory.goBack();
  }

  render() {
    const { account, transactions } = this.props;
    console.log(account);
    return (
      <div>
        <FlatButton
          onClick={() => this.goToAccounts()}
          label="Back to accounts"
          primary={true}
        />

        <h2>{account.name} Transactions</h2>

        <Paper zDepth={1}>
          <Subheader>Account balance {formatMoney(account.balance)}</Subheader>
          {transactions.length === 0 && (
            <Subheader>No transactions available</Subheader>
          )}
          {transactions.length > 0 && (
            <TransactionList transactions={transactions} />
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const accountId = parseInt(ownProps.params.accountId, 10);
  const { accounts, transactions, login } = state;

  return {
    accountId,
    account: accounts.items.find((a) => a.id === accountId),
    transactions: transactions.items,
    authenticated: login.authenticated,
  };
};

export default connect(mapStateToProps)(TransactionsPage);
