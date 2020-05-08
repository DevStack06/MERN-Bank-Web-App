import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { createAccount, hideNewAccountForm } from "../actions";

class NewAccountDialog extends Component {
  submitRequest() {
    const { dispatch } = this.props;

    let accountName = this.refs.accountName.input.value;
    let openingBalance = this.refs.openingBalance.input.value;

    dispatch(createAccount(accountName, openingBalance));
  }

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
            <TextField ref="userName" hintText="User Name" />
          </div>
          <TextField
            ref="accountName"
            hintText="Account name"
            errorText={nameValidationMessage}
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
