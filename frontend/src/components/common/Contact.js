import React from 'react'
import { sendEmail } from '../../lib/api'
import { Link } from 'react-router-dom'
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class Contact extends React.Component {
  state = {
    formData: {
      sender: '',
      message: '',
      subject: ''
    },
    rediterect: false,
    isLoading: false,
    isSent: false,
    errors: {
      emailFormat: false,
      noSubject: false,
      shortMessage: false
    }
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Contact | Nu Hippies",
        metaDescription: "Send us a message, if you have a question regarding our mission, future plans or our products"
      });

    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      this.setState({ isLoading: true })

      if (!this.state.formData.sender.includes('@') || this.state.formData.message.length < 5 || this.state.formData.subject.length === 0) {     
        console.log(this.state.formData, "chyba")
        throw new Error()
      }
      
      const res = await sendEmail(this.state.formData)
      console.log(res.data)
      this.setState({ isLoading: false, isSent: true })

    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
      this.handleErrors()
    }
  }

  handleErrors = () => {

    let errors = {}
    if (!this.state.formData.sender.includes('@') || !this.state.formData.sender.includes('.')) {

      errors = { ...this.state.errors, emailFormat: "Email format is not correct" }

    }

    if (this.state.formData.message.length < 5) {
      errors = { ...errors, shortMessage: "Your message is too short" }
    }

    if (this.state.formData.subject.length === 0) {
      errors = { ...errors, noSubject: "Subject is required" }
    }

    this.setState({ errors })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return window.location.assign('/products')
    }
  }

  render() {
    const { formData, errors, isLoading } = this.state
    return (
      <>
        <SecondHandNavbar />
        <div className="contact-page change-brightness">
        
          {this.renderRedirect()}
          {!this.state.isSent &&
          <div className="form-wrapper">
            <h2>Contact Us</h2>
            <form>
              <div className="input-wrapper">
                <input
                  className={`${errors.emailFormat ? 'error-input' : ''}`}
                  name="sender"
                  placeholder="your email"
                  onChange={this.handleChange}
                  value={formData.sender}
                />
                {errors.emailFormat ? <small className="error-message">{errors.emailFormat}</small> : ''}
              </div>

              <div className="input-wrapper">
                <input
                  className={`${errors.noSubject ? 'error-input' : ''}`}
                  name="subject"
                  placeholder="subject"
                  onChange={this.handleChange}
                  value={formData.subject}
                />
                {errors.noSubject ? <small className="error-message">{errors.noSubject}</small> : ''}
              </div>

              <div className="input-wrapper">
                <textarea
                  className={`${errors.shortMessage ? 'error-input' : ''}`}
                  name="message"
                  placeholder="..."
                  onChange={this.handleChange}
                  value={formData.message}
                  cols="50" rows="7"
                />
                {errors.shortMessage ? <small className="error-message">{errors.shortMessage}</small> : ''}
              </div>

              {isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
              }
              {!isLoading &&
                <div onClick={this.handleSubmit} className="classic-btn" title="Send us a message">Send</div>
              }
            </form>
          </div>
          }

          {this.state.isSent &&
          <div className="sent-message-wrapper">
            <h2>Your message was sent, thanks for contacting us</h2>
            <Link to="/products"><div className="classic-btn">Continue</div></Link>
          </div>
          }

        </div>
      </>
    )
  }
}

export default Contact