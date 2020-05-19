import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { createAccount, hideNewAccountForm, fetchAccounts } from "../actions";
import { browserHistory } from "react-router";
class NewAccountDialog extends Component {
  async submitRequest() {
    const { dispatch } = this.props;

    let accountType = this.refs.accountType.input.value;
    let openingBalance = this.refs.openingBalance.input.value;
    let userName = this.refs.userName.input.value;
    let password = this.refs.password.input.value;
    console.log("opening balance" + openingBalance);

    dispatch(createAccount(userName, openingBalance, accountType, password));
    dispatch(fetchAccounts());
    // setInterval(() => {
    //   console.log("hello world");
    // }, 2000);
    // await this.sleep(3000);
    // this.forceUpdate();
    browserHistory.push("/accounts");
  }

  // sleep = (ms) => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };

  cancel() {
    const { dispatch } = this.props;

    dispatch(hideNewAccountForm());
  }

  render() {
    const {
      showNewAccountForm,
      nameValidationMessage,
      openingBalanceValidationMessage,
    } = this.props;

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={() => this.submitRequest()}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.cancel()}
      />,
    ];

    return (
      <Dialog
        title="Create New Account"
        actions={actions}
        modal={false}
        open={showNewAccountForm}
        onRequestClose={() => this.cancel()}
      >
        <div>
          <div>
            <TextField
              ref="userName"
              hintText="User Name"
              errorText={nameValidationMessage}
            />
          </div>
          <TextField
            ref="accountType"
            hintText="Account Type ex-saving,current etc"
          />
        </div>
        <div>
          <TextField
            ref="openingBalance"
            hintText="Opening Balance"
            errorText={openingBalanceValidationMessage}
          />
        </div>

        <div>
          <TextField ref="password" hintText="Password" />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  const { accounts } = state;
  return {
    accounts: accounts.items,
    showNewAccountForm: accounts.showNewAccountForm,
    nameValidationMessage: accounts.nameValidationMessage,
    openingBalanceValidationMessage: accounts.openingBalanceValidationMessage,
  };
};

export default connect(mapStateToProps)(NewAccountDialog);
