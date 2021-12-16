import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, updateUserAccount } from '../../lib/api';
import { Link } from 'react-router-dom';


class EditAccount extends React.Component {
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
    const { user, formData, errors, isLoading } = this.state
    if (!user) return null
    return (
      <div className="edit-account-page">
        <div className="account-nav">
          <Link to="/profile">Your Acount</Link>
          <span className="sign">&gt;</span>
          <div>Edit Account</div>
        </div>
        
        {!this.state.isEdit &&
        <div className="edit-line-container">
          <div className="edit-line"><span className="bold">Email:</span> {user.email}</div>
          <div className="edit-line"><span className="bold">Username:</span> {user.name}</div>
          <div className="edit-line"><span className="bold">Phone Number:</span> {user.phone}</div>
          <div className="edit-line"><span className="bold">Password:</span> *****</div>
          <button className="classic-btn" onClick={this.showEdit}>Edit</button>
        </div>
        }

        {this.state.isEdit &&
        <div className="edit-line-container">
          <form>
            <label>Email:</label>
            <input 
              className={`${errors.email ? 'error-input' : ''}`}
              name="email"
              value={formData.email}
              onChange={this.handleChange}
            /> 
            {errors.email ? <small className="error-message">{errors.email}</small> : ''}

            <label>Username:</label>
            <input 
              className={`${errors.name ? 'error-input' : ''}`}
              name="name"
              value={formData.name}
              onChange={this.handleChange}
            /> 
            {errors.name ? <small className="error-message">{errors.name}</small> : ''}

            <label>Phone Number:</label>
            <input 
              name="phone"
              value={formData.phone}
              onChange={this.handleChange}
            /> 

            <label>Password:</label>
            <input 
              className={`${errors.password ? 'error-input' : ''}`}
              type="password"
              name="password"
              onChange={this.handleChange}
            /> 
            {errors.password ? <small className="error-message">{errors.password}</small> : ''}

            <label>Password Confirmation:</label>
            <input 
              className={`${errors.passwordConfirmation ? 'error-input' : ''}`}
              type="password"
              name="passwordConfirmation"
              onChange={this.handleChange}
            /> 
            {errors.passwordConfirmation ? <small className="error-message">{errors.passwordConfirmation}</small> : ''}
            {!isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
            }
            {isLoading &&
              <button className="classic-btn edit-btn" onClick={this.handleSubmit}>Done</button>
            }
          </form>
        </div>
        }

        <div onClick={this.handleLogout} className="logout-wrapper">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }

}

export default EditAccount