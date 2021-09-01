import React from 'react'
import { logout } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'
import { Link } from 'react-router-dom'


class Profile extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    try {
      const res = await getMyProfile()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleLogout = () => {
    logout()
    return window.location.assign('/')
  }

  render() {
    console.log(this.state.user)
    if (!this.state.user) return null
    return (
      <div className="profile-section">
        <h1>{this.state.user.name}</h1>
        <div onClick={this.handleLogout} className="logout-wrapper">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    )
  }

}

export default Profile