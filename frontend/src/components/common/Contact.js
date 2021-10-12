import React from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { Redirect, Link } from 'react-router-dom'
import { loginUser, registerUser } from '../../lib/api'

class Contact extends React.Component {
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

  render() {
    const { formData, error, loading } = this.state
    return (
      <div className="contact-page">
        {this.renderRedirect()}
        <div className="form-wrapper">
          <h2>Contact Us</h2>
          <form action="https://formspree.io/f/xoqybbwz"
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