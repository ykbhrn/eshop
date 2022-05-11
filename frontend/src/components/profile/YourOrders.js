import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, updateUserAccount } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'

class YourOrders extends React.Component {
  state = {
    formData: {
      email: "",
      name: "",
      phone: "",
      password: "",
      passwordConfirmation: ""
    },
    errors: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    user: null,
    isEdit: false,
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Orders | Nu Hippies",
        metaDescription: "Our main job is selling fair trade, eco-friendly clothes, and vitamin supplements. We plan to organize speeches with like-minded speakers, debates, and festivals."
      });

      const res = await getMyProfile()
      const formData = { ...this.state.formData, email: res.data.email, name: res.data.name, phone: res.data.phone }
      this.setState({ user: res.data, formData })
    } catch (err) {
      console.log(err);
    }
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
      await updateUserAccount(this.state.formData)
      this.setState({ isLoading: false, isEdit: false })
      this.componentDidMount()
    } catch (err) {
      this.handleErrors(err.response.data)
      console.log(err.response.data)
      this.setState({ isLoading: false })
    }
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
      if (errors.errors.password.kind === "minlength") {
        password = "Password must have at least 6 characters"
      } else {
        password = "Password is required"
      }
    }
    if (errors.errors.passwordConfirmation) {
      passwordConfirmation = 'Password confirmation does not match'
    }

    this.setState({ errors: { name, email, password, passwordConfirmation: passwordConfirmation } })
  }

  showEdit = () => {
    this.setState({ isEdit: true})
  }

  handleLogout = () => {
    logout()
    return window.location.assign('/')
  }

  render() {
    const { user } = this.state
    if (!user) return null
    return (
      <div className="edit-account-page change-brightness">
        <div className="account-nav">
          <Link to="/profile">Your Acount</Link>
          <span className="sign">&gt;</span>
          <div>Your Orders</div>
        </div>

      </div>
    )
  }

}

export default YourOrders