import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { forgotPassword } from '../../lib/api'

class ForgotPassword extends React.Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    redirect: false,
    isLoading: false,
    error: '',
    showResponse: false,
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, email: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ isLoading: true })
      const res = await forgotPassword(this.state.formData)
      this.setState({ showResponse: true, isLoading: false })
      console.log(res)
    } catch (err) {
      this.setState({ error: err.response.data.error, isLoading: false })
    }
  }

  render() {
    const { formData, error, isLoading } = this.state
    return (
      <div className="forgot-page">
        <div className="account-nav">
          <Link to="/entering"><span className="sign-auth">&#60;</span>Back</Link>
        </div>
        <div className="forgot-wrapper">

          {!this.state.showResponse &&
          <>
            <h1>Forgot Your Password?</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Your Email:</label>
              <div className="input-wrapper">
                <input
                  className={`${error ? 'error-input' : ''}`}
                  name="email"
                  onChange={this.handleChange}
                  value={formData.email}
                />
              </div>
              {error && <small className="error-message">{error}</small>}
              {isLoading &&
                <div className="classic-btn">
                  <img src='/images/loading.svg' className='loading-image' />
                </div>
              }
              {!isLoading &&
                <button type="submit" className="classic-btn">Submit</button>  
              }
            </form>
          </>
          }

          {this.state.showResponse &&
            <h1>We just sent you password reset link on your email</h1>
          }
        </div>
      </div>

    )
  }
}

export default ForgotPassword