import React from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'
import { isAuthenticated } from '../../lib/auth'

class Authorization extends React.Component {
  state = {
    login: false,
    register: false
  }

  showRegisterOrLogin = (thing) => {
    if (thing === "login") {
      this.setState({ login: true, register: false })
    } else if (thing === "register") {
      this.setState({ register: true, login: false })
    }
  }

  render() {
    return (
      <div className="auth-page">
        {!this.state.login && !this.state.register &&
          <div className="authorization-section">
            <div className="authorization-wrapper">
              Are you already our member?
              <button className="auth-btn" onClick={() => {
                this.showRegisterOrLogin("login")
              }}>Login</button>
            </div>
            <div className="authorization-wrapper">
              Do you wanna join?
              <button className="auth-btn" onClick={() => {
                this.showRegisterOrLogin("register")
              }}>Register</button>
            </div>
          </div>
        }
        {this.state.login &&
          <div className="auth-side">
            <Login />
            <div className="auth-btn-wrapper">
              Don&apos;t have an account yet?
              <button className="auth-btn" onClick={() => {
                this.showRegisterOrLogin("register")
              }}>Register</button>
            </div>
          </div>
        }
        {this.state.register &&
          <div className="auth-side">
            <Register />
            <div className="auth-btn-wrapper">
              Are you already our member?
              <button className="auth-btn" onClick={() => {
                this.showRegisterOrLogin("login")
              }}>Login</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Authorization