import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import AppBar from 'material-ui/AppBar'
import { resetErrorMessage, attemptLogout } from '../actions'
import './app.css'
import Logout from '../components/Logout'

const styles = {
  title: {
    cursor: 'pointer',
  }
}

class App extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  goHome() {
    browserHistory.push('/')
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props

    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
          onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, authenticated, onLogoutClick } = this.props
    return (
      <div className="app">
        <AppBar
          title={<span style={styles.title}>React Bank</span>}
          onTitleTouchTap={() => this.goHome()}
          showMenuIconButton={false}
          iconElementRight={<Logout visible={authenticated} onClick={onLogoutClick} />}
        />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { login } = state
  return {
    errorMessage: state.errorMessage,
    authenticated: login.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutClick: () => {
      dispatch(attemptLogout())
    },
    resetErrorMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)