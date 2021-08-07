import React from 'react'
import { logout } from '../../lib/auth'
import { getPortfolio, updateUser } from '../../lib/api'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Profile extends React.Component {

  state = {

  }

  handleLogout = () => {
    logout()
    return window.location.assign('/')
  }

  render() {
    return (
      <div onClick={this.handleLogout} className="logout">
        <img src='./images/logo.png' />
      </div>
    )
  }

}

export default Profile