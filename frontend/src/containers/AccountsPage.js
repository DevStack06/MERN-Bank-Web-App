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
  showNewAccountForm,
  showTransferFunds,
} from "../actions";

const style = {
  float: "right",
};

class AccountsPage extends Component {
  state = {
    show: false,
  };

  startTimer = () => {
    setInterval(() => {
      this.setState({
        show: true,
      });
    }, 2000);
  };

  componentDidMount() {
    this.startTimer();
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
      onAddAccountClick,
      showNewAccountForm,
      showTransferFunds,
      onTransferFundsClick,
      showTransferFundsButton,
    } = this.props;
    return (
      <div>
        <h2>
          Admin Accounts
          {/* {showTransferFundsButton && (
            <FlatButton
              label="Transfer funds"
              style={style}
              labelPosition="before"
              primary={true}
              icon={<SwapIcon />}
              onTouchTap={onTransferFundsClick}
            />
          )} */}
        </h2>
        <div>
          {accounts.map((account) => (
            <Account
              key={account.id}
              {...account}
              viewTransactions={this.goToTransactions}
            />
          ))}
        </div>
        <FloatingActionButton
          style={style}
          title="Create a new account"
          onTouchTap={onAddAccountClick}
        >
          <ContentAdd />
        </FloatingActionButton>
        {showNewAccountForm && <NewAccountDialog />}
        {showTransferFunds && <TransferFundsDialog />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { accounts, login } = state;
  return {
    isFetching: accounts.isFetching,
    accounts: accounts.items.slice(1, accounts.items.length),
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
