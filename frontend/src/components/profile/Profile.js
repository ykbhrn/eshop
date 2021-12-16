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
      window.scrollTo(0, 0)
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

          <Link to="/profile/orders">
            <div className="profile-icon">
              <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639598032/Nu%20Hippies/icons/orders_xit6y1.png" />
              <div className="profile-icon-decription">
                <div>Your Orders</div>
                <div className="description">
            Check your previous orders or buy it again
                </div>
              </div>
            </div>
          </Link>

          <Link to="/profile/edit">
            <div className="profile-icon">
              <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639598187/Nu%20Hippies/icons/profile_fwkd3p.png" />
              <div className="profile-icon-description">
                <div>Your Account</div>
                <div className="description">
                Edit your login details
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/profile/adress">
            <div className="profile-icon">
              <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639598159/Nu%20Hippies/icons/map_ratocx.png" />
              <div className="profile-icon-description">
                <div>Your Adress</div>
                <div className="description">
            Edit your shipping and billing adress
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div onClick={this.handleLogout} className="logout-wrapper">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }

}

export default Profile;