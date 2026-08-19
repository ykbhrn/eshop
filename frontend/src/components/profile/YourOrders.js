import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, updateUserAccount } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

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
        title: "Edit adress | Nu Hippies",
        metaDescription: "See all your orders history"
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
      <>
        <SecondHandNavbar />

        <div className='orders-page'>
          <style>
            {'\
          .donation-icon{\
            display: flex;\
          }\
          '}
          </style>
        
          <div className="account-nav">
            <Link to="/profile">Your Acount</Link>
            <span className="sign">&gt;</span>
            <div>Your Orders</div>
          </div>

          {user.paidOrders < 1 && 
          <div className='no-orders-wrapper'>
            <h1>You don&apos;t have any orders yet</h1>
            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Ctext%20x%3D%2750%27%20y%3D%2754%27%20font-size%3D%2778%27%20text-anchor%3D%27middle%27%20dominant-baseline%3D%27central%27%3E%F0%9F%93%A6%3C%2Ftext%3E%3C%2Fsvg%3E" />
          </div>
          }

        </div>

      </>
    )
  }

}

export default YourOrders