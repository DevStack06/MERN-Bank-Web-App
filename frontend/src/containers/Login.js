import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { attemptLogin } from "../actions";
// import { browserHistory } from "react-router";

import { fetchAccounts } from "../actions";

class Login extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchAccounts());
  }

  onLoginClick() {
    const { dispatch } = this.props;
    let username = this.refs.username.input.value;
    let password = this.refs.password.input.value;

    // console.log("jdbbdvb  " + u);
    dispatch(
      attemptLogin({
        username,
        password,
      })
    );
  }

  render() {
    const { usernameValidationMessage, passwordValidationMessage } = this.props;
    return (
      <div>
        <h3>Login</h3>

        <h4>
          Enter your username and password{" "}
          {/* <span style={{ color: "grey", fontSize: "smaller" }}>
            (anything will do, it's not real)
          </span> */}
        </h4>

        <div>
          <TextField
            hintText="Username"
            ref="username"
            errorText={usernameValidationMessage}
          />
        </div>
        <div>
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            ref="password"
            errorText={passwordValidationMessage}
          />
        </div>
        <RaisedButton
          label="Login"
          primary={true}
          onClick={() => this.onLoginClick()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    usernameValidationMessage: login.usernameValidationMessage,
    passwordValidationMessage: login.passwordValidationMessage,
  };
};

export default connect(mapStateToProps)(Login);
