import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, deleteUsedItem } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class YourAds extends React.Component {
  state = {
    user: null,
    isLoading: false,
    deleteAd: false,
    itemToDelete: ''
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

  deleteItem = async () => {

    try {
      this.setState({isLoading: true})

      await deleteUsedItem(this.state.itemToDelete)

      this.setState({isLoading: false})

      window.location.assign('/profile/ads')
    
    } catch (err) {
      window.location.assign('/error')
    }

  }

  handleDelete = (item) => {
    this.setState({deleteAd: this.state.deleteAd ? false : true, itemToDelete: item})
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
            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Ctext%20x%3D%2750%27%20y%3D%2754%27%20font-size%3D%2778%27%20text-anchor%3D%27middle%27%20dominant-baseline%3D%27central%27%3E%F0%9F%93%A2%3C%2Ftext%3E%3C%2Fsvg%3E" />
          </div>
          }

          {this.state.deleteAd &&
                
                <div className='password-change-notification'>
                Are You Sure You Want To Delete This Ad?
                
                  <div className='buttons'>
                    <button className="classic-btn" onClick={this.handleDelete}>Cancel</button>
                
                    {this.state.isLoading &&
                    <div className="classic-btn btn-loading">
                      <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                    </div>
                    }
                
                    {!this.state.isLoading &&
                  <button className="classic-btn" onClick={this.deleteItem}>Yes</button>
                    }
                  
                  </div>
                
                </div>

          }

          {user.userUsedItems.length >= 1 && 
          <div className="product-container">
            {user.userUsedItems.map(item => {

              const newName = item.title.replace(/ /g, '-')

              return <div key={item._id}> 
                <div className='edit-delete-wrapper'>
                  <Link to={`/second-hand/edit-item/${newName}/${item._id}`}>Edit</Link>

                  <div className='delete-item' onClick={() => {
                    this.handleDelete(item._id)
                  }}>Delete</div>

                </div>
                
                <Link to={`/second-hand/items/${newName}/${item._id}`} title={item.title} key={item._id}>
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
                </Link>
              </div>
            })}
          </div>
          }

        </div>

      </>
    )
  }

}

export default YourAds