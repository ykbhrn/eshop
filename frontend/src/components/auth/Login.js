import React from 'react'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { loginUser } from '../../lib/api'

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
  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.props.id) {
        return window.location.assign(`/products/${this.props.id}`)
      } else {
        return window.location.assign('/products')
      }
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
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
          </div>
          {error && <small className="error-message">{error}</small>}
          <div className="login-bttn-wrapper">
            <button type="submit" className="classic-btn">Login</button>
            <Link to="/forgot-password">
              <div className="forgot">Forgot your password?</div>
            </Link>
          </div>
        </form>
      </section>

    )
  }
}

export default Login