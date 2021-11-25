import React from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { resetPassword } from '../../lib/api'

class ResetPassword extends React.Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    redirect: false,
    loading: false,
    error: '',
    showResponse: false,
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value, resetToken: this.props.match.params.token }
    console.log(formData)
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ loading: true })
      const res = await resetPassword(this.state.formData)
      this.setState({ showResponse: true, loading: false })
      console.log(res)
    } catch (err) {
      this.setState({ error: err.response.data.error, loading: false })
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
      <div className="reset-page">
        {this.renderRedirect()}
        <div className="forgot-wrapper">

          {!this.state.showResponse &&
          <>
            <h1>Confirm your new password</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Password:</label>
              <div className="input-wrapper">
                <input
                  className={`${error ? 'error-input' : ''}`}
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={formData.password}
                />
              </div>

              <label>Password Confirmation:</label>
              <div className="input-wrapper">
                <input
                  className={`${error ? 'error-input' : ''}`}
                  name="passwordConfirmation"
                  type="password"
                  onChange={this.handleChange}
                  value={formData.passwordConfirmation}
                />
              </div>

              {error && <small className="error-message">{error}</small>}
              <button type="submit" className="forgot-btn">Submit</button>
            </form>
          </>
          }

          {this.state.showResponse &&
            <h1>Your password is changed, you can login now</h1>
          }
        </div>
      </div>

    )
  }
}

export default ResetPassword