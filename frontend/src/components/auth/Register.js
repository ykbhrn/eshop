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
    },
    errors: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    rediterect: false,
    isLoading: false
  }

  handleErrors = (errors) => {
    let name = ''
    let email = ''
    let password = ''
    let passwordConfirmation = ''
    let sports = ''
    let userType = 1
    console.log(errors)

    if (errors.errors.name){
      if (errors.errors.name.kind === "unique") {
        name = "Username is already taken"
      } else {
        name = "Username is required"
      }
    }
    if (errors.errors.email){
      if (errors.errors.email.kind === "unique") {
        email = "This Email is already registered"
      } else {
        email = "Email is required"
      }
    }
    if (errors.errors.password) {
      password = 'Password is required'
    }
    if (errors.errors.passwordConfirmation){
      passwordConfirmation = 'Password confirmation does not match'
    }

    this.setState({ errors: { name, email, password, passwordConfirmation: passwordConfirmation} })
  }

  handleChange = event => {
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
      return <Redirect to="/done" />
    }
  }

  render() {
    const { formData, errors } = this.state
    return (
      <section className="register">
        {this.renderRedirect()}
        <h1>All we are saying is give us a chance</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="register-input-top-wrapper">
            <label>Nickname:</label>
            <div className="input-wrapper">
              <input
                className={`${errors.name ? 'error-input' : ''}`}
                placeholder="name"
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
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={formData.email}
              />
              {errors.email ? <small className="error-message">{errors.email}</small> : ''}
            </div>
          </div>

          <div className="register-input-bottom-wrapper">
            <div className="input-wrapper">
              <label>Password:</label>
              <input
                className={`${errors.password ? 'error-input' : ''}`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={formData.password}
              />
              {errors.password && <small className="error-message">{errors.password}</small>}
            </div>

            <div className="input-wrapper">
              <label>Password Confirmation:</label>
              <input
                className={`${errors.passwordConfirmation ? 'error-input' : ''}`}
                type="password"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                onChange={this.handleChange}
                value={formData.passwordConfirmation}
              />
              {errors.passwordConfirmation && <small className="error-message">{errors.passwordConfirmation}</small>}
            </div>
          </div>
          <button type="submit" className="btn third">Register</button>
        </form>
      </section>

    )
  }
}

export default Register