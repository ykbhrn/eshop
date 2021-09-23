import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile } from '../../lib/api';
import { Link } from 'react-router-dom';


class Profile extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    try {
      const res = await getMyProfile();
      this.setState({ user: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleLogout = () => {
    logout();
    return window.location.assign('/');
  }

  render() {
    console.log(this.state.user);
    if (!this.state.user) return null;
    return (
      <div className="profile-page">
        <div className="profile-icons-wrapper">
          <div className="profile-icon">
            <img src="./images/orders.png" />
            <div className="profile-icon-decription">
              <div>Your Orders</div>
              <div className="description">
            Check your previous orders or buy it again
              </div>
            </div>
          </div>

          <div className="profile-icon">
            <img src="./images/profile.png" />
            <div className="profile-icon-description">
              <div>Your Account</div>
              <div className="description">
            Edit your login details
              </div>
            </div>
          </div>

          <div className="profile-icon">
            <img src="./images/map.png" />
            <div className="profile-icon-description">
              <div>Your Adress</div>
              <div className="description">
            Edit your shipping and billing adress
              </div>
            </div>
          </div>
        </div>

        <div onClick={this.handleLogout} className="logout-wrapper">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }

}

export default Profile;