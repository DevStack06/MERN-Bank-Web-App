import React, { Component } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import SwapIcon from "material-ui/svg-icons/action/swap-horiz";
import FlatButton from "material-ui/FlatButton";
import Account from "../components/Account";
import NewAccountDialog from "./NewAccountDialog";
import TransferFundsDialog from "./TransferFundsDialog";
import {
  fetchAccounts,
  requestAccountById,
  showNewAccountForm,
  showTransferFunds,
} from "../actions";

const style = {
  float: "right",
};

class UserAccountsPage extends Component {
  componentDidMount() {
    const { dispatch, authenticated } = this.props;
    if (!authenticated) {
      browserHistory.push("/");
    }
    dispatch(fetchAccounts());
  }

  goToTransactions(id) {
    browserHistory.push(`/accounts/${id}/transactions`);
  }

  render() {
    const {
      accounts,
      account,
      onAddAccountClick,
      showNewAccountForm,
      showTransferFunds,
      onTransferFundsClick,
      showTransferFundsButton,
    } = this.props;
    console.log("accounts---->" + JSON.stringify(accounts));
    console.log("account --->" + JSON.stringify(account));
    const realAccount = accounts.items.find((acc) => {
      return acc.id === account.id;
    });
    console.log("reaalaccount--->" + realAccount);

    return (
      <div>
        <h2>
          User Accounts
          {showTransferFundsButton && (
            <FlatButton
              label="Transfer funds"
              style={style}
              labelPosition="before"
              primary={true}
              icon={<SwapIcon />}
              onTouchTap={onTransferFundsClick}
            />
          )}
        </h2>
        <div>
          <Account
            key={realAccount.id}
            {...realAccount}
            viewTransactions={this.goToTransactions}
          />
        </div>
        {/* <FloatingActionButton
          style={style}
          title="Create a new account"
          onTouchTap={onAddAccountClick}
        >
          <ContentAdd />
        </FloatingActionButton> */}
        {/* {showNewAccountForm && <NewAccountDialog />} */}
        {showTransferFunds && <TransferFundsDialog />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { accounts, login } = state;
  return {
    accounts: accounts,
    isFetching: accounts.isFetching,
    account: accounts.item,
    authenticated: login.authenticated,
    showNewAccountForm: accounts.showNewAccountForm,
    showTransferFunds: accounts.showTransferFunds,
    showTransferFundsButton: accounts.showTransferFundsButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAccountClick: () => {
      dispatch(showNewAccountForm());
    },
    onTransferFundsClick: () => {
      dispatch(showTransferFunds());
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountsPage);
