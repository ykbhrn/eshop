import React from 'react'
import { resetPassword } from '../../lib/api'
import { Link } from 'react-router-dom'

class ResetPassword extends React.Component {
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
    const formData = { ...this.state.formData, [event.target.name]: event.target.value, resetToken: this.props.match.params.token }
    console.log(formData)
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ isLoading: true })
      const res = await resetPassword(this.state.formData)
      this.setState({ showResponse: true, isLoading: false })
      console.log(res)
    } catch (err) {
      this.setState({ error: err.response.data.error, isLoading: false })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return window.location.assign('/products')
    }
  }

  render() {
    const { formData, error, isLoading } = this.state
    return (
      <div className="reset-page">
        {this.renderRedirect()}

        <div className="account-nav">
          <Link to="/entering"><span className="sign">&#60; </span>Back</Link>
        </div>
          
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
              {isLoading &&
                <div className="classic-btn  btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
              }
              {!isLoading &&
                <button type="submit" className="classic-btn">Submit</button>  
              }
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