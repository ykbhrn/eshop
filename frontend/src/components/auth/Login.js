import React from 'react'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { loginUser, updateUserAccount } from '../../lib/api'

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
    const discount = localStorage.getItem('discount')
    if (discount) {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value, discount: discount }
      this.setState({ formData, error: '' })
    } else {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData, error: '' })
    }
   
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ isLoading: true })
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      localStorage.removeItem('discount')
      this.setState({ redirect: true })
    } catch (err) {
      this.setState({ error: 'Invalid Credentials', isLoading: false })
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
    const { formData, error, isLoading } = this.state
    return (
      <section className="register">
        {this.renderRedirect()}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>

          <div className="input-wrapper">
            <label>Email:</label>
            <input
              className={`${error ? 'error-input' : ''}`}
              name="email"
              onChange={this.handleChange}
              value={formData.email}
            />
          </div>

          <div className="input-wrapper">
            <label>Password:</label>
            <input
              className={`${error ? 'error-input' : ''}`}
              type="password"
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
            {error && <small className="error-message">{error}</small>}
          </div>
          <div className="login-bttn-wrapper">
            {isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
            }
            {!isLoading &&
                <button type="submit" className="classic-btn">Login</button>  
            }
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