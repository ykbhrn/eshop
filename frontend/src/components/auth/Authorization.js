import React from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'
import { isAuthenticated } from '../../lib/auth'
import {seo} from '../../lib/functions'

class Authorization extends React.Component {
  state = {
    login: false,
    register: false
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Give us a chance | Nu Hippies",
        metaDescription: "All we are saying is give us a chance"
      });

    } catch (err) {
      console.log(err)
    }
  }
  
  showRegisterOrLogin = (thing) => {
    if (thing === "login") {
      this.setState({ login: true, register: false })
    } else if (thing === "register") {
      this.setState({ register: true, login: false })
    }
  }

  showAuth = () => {
    this.setState({ login: false, register: false })
  }

  render() {
    return (
      <div className="auth-page">
        {!this.state.login && !this.state.register &&
          <div className="authorization-section">
            <div className="authorization-wrapper" onClick={() => {
              this.showRegisterOrLogin("register")
            }}>
              All we are saying is give us a chance
              <button className="classic-btn">Register</button>
            </div>

            <div className="authorization-wrapper" onClick={() => {
              this.showRegisterOrLogin("login")
            }}>
              Are you already member of our community?
              <button className="classic-btn">Login</button>
            </div>
          </div>
        }
        {this.state.login &&
        <>
          <div className="account-nav">
            <div className="auth" onClick={this.showAuth}><span className="sign-auth">&#60;</span>Back</div>
          </div>
          <div className="auth-side">
            <Login
              id={this.props.match.params.id}
              name={this.props.match.params.name}
            />
            <div className="auth-btn-wrapper">
              Don&apos;t have an account yet?
              <button className="classic-btn" onClick={() => {
                this.showRegisterOrLogin("register")
              }}>Register</button>
            </div>
          </div>
        </>
        }
        {this.state.register &&
        <>
          <div className="account-nav">
            <div className="auth" onClick={this.showAuth}><span className="sign-auth">&#60;</span>Back</div>
          </div>
          <div className="auth-side">
            <Register
              id={this.props.match.params.id}
              name={this.props.match.params.name}
            />
            <div className="auth-btn-wrapper">
              Are you already our member?
              <button className="classic-btn" onClick={() => {
                this.showRegisterOrLogin("login")
              }}>Login</button>
            </div>
          </div>
        </>
        }
      </div>
    )
  }
}

export default Authorization