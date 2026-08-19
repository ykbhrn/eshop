import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

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
    console.log(this.state.user)
    return (
      <>
        <SecondHandNavbar />
        <div className="profile-page change-brightness">
        
          <div className="profile-icons-container">

            <Link to="/profile/ads">
              <div className="profile-icon">
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Ctext%20x%3D%2750%27%20y%3D%2754%27%20font-size%3D%2778%27%20text-anchor%3D%27middle%27%20dominant-baseline%3D%27central%27%3E%F0%9F%93%A2%3C%2Ftext%3E%3C%2Fsvg%3E" alt="Your ads" />
                <div className="profile-icon-description">
                  <div className="profile-icon-text">Your Ads</div>
                  <div className="description">
                    Edit Your Posted Ads
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/profile/orders">
              <div className="profile-icon">
                <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639598032/Nu%20Hippies/icons/orders_xit6y1.png" />
                <div className="profile-icon-description">
                  <div className="profile-icon-text">Your Orders</div>
                  <div className="description">
            Check your previous orders from our shop
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
      </>
    );
  }

}

export default Profile;