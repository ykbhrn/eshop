import React from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'

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
      <div>
        <div>
          Are you already our member?
          <button onClick={() => {
            this.showRegisterOrLogin("login")
          }}>Login</button>
        </div>
        <div>
          DO you wanna join?
          <button onClick={() => {
            this.showRegisterOrLogin("register")
          }}>Register</button>        </div>
        {this.state.login &&
          <Login />
        }
        {this.state.register &&
          <Register />
        }
      </div>
    )
  }
}

export default Authorization