import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'

class Profile extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Profile | Nu Hippies",
        metaDescription: "Check, add something or edit your profile info."
      });

      const res = await getMyProfile();
      this.setState({ user: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleLogout = () => {
    localStorage.removeItem('discount')
    logout();
    return window.location.assign('/');
  }

  render() {
    if (!this.state.user) return null;
    console.log(this.state.user);
    return (
      <div className="profile-page change-brightness">
        <div className="profile-icons-container">

          <Link to="/profile/orders">
            <div className="profile-icon">
              <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639598032/Nu%20Hippies/icons/orders_xit6y1.png" />
              <div className="profile-icon-decription">
                <div className="profile-icon-text">Your Orders</div>
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
                <div className="profile-icon-text">Your Account</div>
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
                <div className="profile-icon-text">Your Adress</div>
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