import React from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { loginUser, registerUser } from '../../lib/api'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    rediterect: false,
    isLoading: false,
    error: ''
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ loading: true })
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      this.setState({ redirect: true })

    } catch (err) {
      this.setState({ error: 'Invalid Credentials', loading: false })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return window.location.assign('/products')
    }
  }

  render() {
    const { formData, error, loading } = this.state
    return (
      <section className="register">
        {this.renderRedirect()}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>

          <label>Email:</label>
          <div className="input-wrapper">
            <input
              className={`${error ? 'error-input' : ''}`}
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              value={formData.email}
            />
          </div>

          <label>Password:</label>
          <div className="input-wrapper">
            <input
              className={`${error ? 'error-input' : ''}`}
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
          </div>
          {error && <small className="error-message">{error}</small>}
          <button type="submit" className="btn third">Login</button>
        </form>
      </section>

    )
  }
}

export default Login