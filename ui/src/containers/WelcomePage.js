import React, { Component } from "react";
import { connect } from "react-redux";
// import { browserHistory } from "react-router";
// import FlatButton from "material-ui/FlatButton";
import Login from "./Login";

class WelcomePage extends Component {
  //   goToAccounts() {
  //     browserHistory.push("/accounts");
  //   }
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <h2>Welcome to React Bank</h2>

        {!authenticated && <Login />}
        {/* {authenticated && (
          <FlatButton
            onClick={() => this.goToAccounts()}
            label="View Accounts"
            primary={true}
          />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    authenticated: login.authenticated,
  };
};

export default connect(mapStateToProps)(WelcomePage);
