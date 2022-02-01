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
    },
    redirect: false,
    isLoading: false
  }

  handleErrors = (errors) => {
    let name = ''
    let email = ''
    let password = ''
    let passwordConfirmation = ''

    if (errors.errors.name) {
      if (errors.errors.name.kind === "unique") {
        name = "Username is already taken"
      } else {
        name = "Username is required"
      }
    }
    if (errors.errors.email) {
      if (errors.errors.email.kind === "unique") {
        email = "This Email is already registered"
      } else {
        email = "Email is required"
      }
    }
    if (errors.errors.password) {
      password = 'Password is required'
    }
    if (errors.errors.passwordConfirmation) {
      passwordConfirmation = 'Password confirmation does not match'
    }

    this.setState({ errors: { name, email, password, passwordConfirmation: passwordConfirmation } })
  }

  handleChange = event => {
    console.log(this.props.id)
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ isLoading: true })
      const response = await registerUser(this.state.formData)

      if (response.status === 201) {
        const loginResponse = await loginUser(this.state.formData)
        setToken(loginResponse.data.token)
        this.setState({ redirect: true })
      }
      if (response.status === 422) throw new Error()
    } catch (err) {
      this.handleErrors(err.response.data)
      this.setState({ isLoading: false })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.props.id) {
        return window.location.assign(`/products/${this.props.id}`)
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
        <h1>All We Are Saying Is Give Us A Chance</h1>
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
          {isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
          }
          {!isLoading &&
            <button type="submit" className="classic-btn">Register</button>  
          }
        </form>
      </div>

    )
  }
}

export default Register