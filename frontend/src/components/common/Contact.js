import React from 'react'

class Contact extends React.Component {
  state = {
    formData: {
      email: '',
      password: '',
    },
    rediterect: false,
    isLoading: false,
    isSent: false,
    error: ''
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)
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
      this.setState({ loading: true })

      this.setState({ isSent: true })
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
      <div className="contact-page">
        {this.renderRedirect()}
        <div className="form-wrapper">
          <h2>Contact Us</h2>
          <form action="https://formspree.io/f/mknkdgqb" onClick={this.handleSubmit}
            method="POST">
            <input className="email" type="email" name="email" placeholder="your email" />
            <input className="subject" type="text" name="subject" placeholder="subject" />
            <textarea className="message" name="message" id="" cols="50" rows="7" placeholder="..."></textarea>
            <div className="status"></div>
            <button className="button" type="submit">Send</button>
          </form>
        </div>
      </div>

    )
  }
}

export default Contact