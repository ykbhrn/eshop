import React from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { loginUser, registerUser } from '../../lib/api'

class Register extends React.Component {
  state = {
    formData: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      userType: 2
    },
    errors: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      general: ''
    },
    redirect: false,
    isLoading: false
  }

  blankErrors = () => ({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    general: ''
  })

  // Maps a Mongoose validation payload onto the individual form fields.
  mapFieldErrors = (fieldErrors) => {
    let name = ''
    let email = ''
    let password = ''
    let passwordConfirmation = ''

    if (fieldErrors.name) {
      if (fieldErrors.name.kind === "unique") {
        name = "Username is already taken"
      } else {
        name = "Username is required"
      }
    }
    if (fieldErrors.email) {
      if (fieldErrors.email.kind === "unique") {
        email = "This Email is already registered"
      } else if (fieldErrors.email.wrongFormat) {
        email = fieldErrors.email.wrongFormat
      } else {
        email = "Email is required"
      }
    }
    if (fieldErrors.password) {
      password = 'Password is required'
    }
    if (fieldErrors.passwordConfirmation) {
      passwordConfirmation = 'Password confirmation does not match'
    }

    return { ...this.blankErrors(), name, email, password, passwordConfirmation }
  }

  // Turns any failure into something displayable. The server does not always
  // answer with a validation payload: it can be unreachable, or return an HTML
  // error page (e.g. a 502 while the instance restarts), so nothing here may
  // assume a particular response shape.
  buildErrors = (err) => {
    if (!err.response) {
      return {
        ...this.blankErrors(),
        general: 'Could not reach the server. Please check your connection and try again.'
      }
    }

    const { status, data } = err.response

    if (data && data.errors) {
      return this.mapFieldErrors(data.errors)
    }

    if (status >= 500) {
      return {
        ...this.blankErrors(),
        general: 'The server ran into a problem and could not complete your registration. Please try again in a moment.'
      }
    }

    if (data && data.message) {
      return { ...this.blankErrors(), general: data.message }
    }

    return {
      ...this.blankErrors(),
      general: `Registration failed (error ${status}). Please try again.`
    }
  }

  handleChange = event => {
    const localDiscount = localStorage.getItem('discount')
    const errors = { ...this.state.errors, [event.target.name]: '' }

    if (localDiscount) {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value, discount: localDiscount }
      this.setState({ formData, errors })
    } else {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData, errors })
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true, errors: this.blankErrors() })

    let registered = false

    try {
      const response = await registerUser(this.state.formData)
      registered = response.status === 201

      const loginResponse = await loginUser(this.state.formData)
      setToken(loginResponse.data.token)
      localStorage.removeItem('discount')
      this.setState({ redirect: true })
    } catch (err) {
      // The account may already exist even though sign-in failed, so say so
      // rather than inviting the user to register a second time.
      const errors = registered
        ? {
          ...this.blankErrors(),
          general: 'Your account was created, but we could not sign you in automatically. Please use the login page.'
        }
        : this.buildErrors(err)

      this.setState({ errors, isLoading: false })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.props.id && !this.props.secondHand) {
        return window.location.assign(`/products/${this.props.name}/${this.props.id}`)
      } else if (this.props.secondHand) {
        return window.location.assign(`/second-hand/items/${this.props.name}/${this.props.id}`)
      } else {
        return <Redirect to="/done" />
      }
    }
  }

  render() {
    const { formData, errors, isLoading } = this.state
    return (
      <div className="register">
        {this.renderRedirect()}
        <h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <div className="input-wrapper">
            <input
              className={`${errors.name ? 'error-input' : ''}`}
              name="name"
              onChange={this.handleChange}
              value={formData.name}
            />
            {errors.name ? <small className="error-message">{errors.name}</small> : ''}
          </div>

          <label>Email:</label>
          <div className="input-wrapper">
            <input
              className={`${errors.email ? 'error-input' : ''}`}
              name="email"
              type="email"
              onChange={this.handleChange}
              value={formData.email}
            />
            {errors.email ? <small className="error-message">{errors.email}</small> : ''}
          </div>

          <label>Password:</label>
          <div className="input-wrapper">
            <input
              className={`${errors.password ? 'error-input' : ''}`}
              type="password"
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
            {errors.password && <small className="error-message">{errors.password}</small>}
          </div>

          <label>Password Confirmation:</label>
          <div className="input-wrapper">
            <input
              className={`${errors.passwordConfirmation ? 'error-input' : ''}`}
              type="password"
              name="passwordConfirmation"
              onChange={this.handleChange}
              value={formData.passwordConfirmation}
            />
            {errors.passwordConfirmation && <small className="error-message">{errors.passwordConfirmation}</small>}
          </div>
          {errors.general && <small className="error-message">{errors.general}</small>}
          {isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
          }
          {!isLoading &&
            <button type="submit" className="classic-btn" title="Give Us a Chance">Register</button>  
          }
        </form>
      </div>

    )
  }
}

export default Register