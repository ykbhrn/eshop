import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, updateUserAccount } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class YourAds extends React.Component {
  state = {
    user: null,
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Your Ads | Nu Hippies",
        metaDescription: "See all your orders history"
      });

      const res = await getMyProfile()
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err);
    }
  }

  otherPreviewImage = (id) => {
    this.setState({ hoveredProductId: id });
  }

  render() {
    const { user } = this.state
    if (!user) return null
    return (
      <>
        <SecondHandNavbar />

        <div className='ads-page'>
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
            <div>Your Ads</div>
          </div>

          {user.userUsedItems.length < 1 && 
          <div className='no-orders-wrapper'>
            <h1>You didn&apos;t post any ads yet</h1>
            <img src="https://res.cloudinary.com/nuhippies/image/upload/v1666371894/Nu%20Hippies/icons/promotion_e0xajd.png" />
          </div>
          }

          {user.userUsedItems.length >= 1 && 
          <div className="product-container">
            {user.userUsedItems.map(item => {

              const newName = item.title.replace(/ /g, '-')

              return <Link to={`/second-hand/items/${newName}/${item._id}`} title={item.title} key={item._id}>
                <div className="product-wrapper" onMouseEnter={() => {
                  this.otherPreviewImage(item._id);
                }}
                onMouseLeave={this.backToMainProductImage}>
                  <div className="product-preview-image"
                    style={{ backgroundImage: `url(${this.state.hoveredProductId === item._id && item.images[1] ? item.images[1] : item.images[0]})` }}>
                  </div>
                  <div className="product-preview-name">{item.title}</div>
                  <div className="product-preview-price-wrapper">
                    <div className="product-preview-price">£{item.price}</div>
                  </div>
                </div>
              </Link>;
            })}
          </div>
          }

        </div>

      </>
    )
  }

}

export default YourAds