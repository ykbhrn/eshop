import React from 'react';
import { getMyProfile, addShipping } from '../../lib/api';
import { Link, Redirect } from 'react-router-dom';
import {seo, mainMetaDescription} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class Shipping extends React.Component {
  state = {
    user: null,
    shipping: 399,
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Shipping Options",
        metaDescription: {mainMetaDescription}
      });

      const res = await getMyProfile();
      let basketSize = 0;
      res.data.basket.map(item => {
        basketSize = basketSize + Number(item.chosenQuantity);
      });
      if (res.data.pendingOrder) {
        this.setState({ user: res.data, totalQuantity: basketSize, shipping: res.data.pendingOrder.shipping, isLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleShipping = async (event) => {
    const formData = { shipping: event.target.value };
    try {
      this.setState({ isLoading: true })
      await addShipping(formData);
      this.componentDidMount()
    } catch (err) {
      console.log(err);
    }
  }

  continue = () => {
    this.setState({ isLoading: true })
    this.props.history.push('/payment')
  }

  render() {
    if (!this.state.user) return null;
    const { user, isLoading } = this.state;
    return (
      <>
        <SecondHandNavbar />

        <div className="shipping-page">
        
          <div className="shipping-radio">
            <h2>Shipping options:</h2>
            <div className="shipping-option">
              <div className="shipping-option-name-radio">
                <input
                  type="radio"
                  value={399}
                  onChange={this.handleShipping}
                  checked={this.state.shipping == 399}
                />
                <div className="shipping-option-name">
                  <label>Royal Mail Standard</label>
                  <div className="shipping-description">3 to 5 business days</div>
                </div>
              </div>
              <div>£3.99</div>
            </div>

            <div className="shipping-option">
              <div className="shipping-option-name-radio">
                <input
                  type="radio"
                  value={699}
                  onChange={this.handleShipping}
                  checked={this.state.shipping == 699}
                />
                <div className="shipping-option-name">
                  <label>Royal Mail Express</label>
                  <div className="shipping-description">1 to 2 business days</div>
                </div>
              </div>
              <div>£6.99</div>
            </div>
          </div>

          <div className="basket-preview">
            <div className="order-items-container">
              {user.basket.map(item => {            
                return <div key={item.id} className="image-checkout-wrapper"> 
                  <div className="image-checkout" style={{
                    backgroundImage: `url(${item.images[0].images[0]})`
                  }}>
                  </div>  
                  <div className="image-checkout-name">
                    {item.name}
                    <div className="image-checkout-description">
                      <span className="size">Size: {item.chosenSize}</span>
                      <span className="color">Color: {item.chosenColor}</span>
                      Quantity: {item.chosenQuantity}
                    </div>
                  </div>
                </div>;
              })}
            </div>
          
            <div className="total-price-checkout-wrapper">
              <div>Sum ({this.state.totalQuantity} Items): £{user.sumPrice / 100}</div>
              <div>Your Discount: {user.discount}% (£{user.discountAmount / 100})</div>
              <div className="total-text">Shipping: £{this.state.shipping / 100}</div>
              <div>Total Price: £{(user.totalPrice + this.state.shipping) / 100}</div>
            </div>
            <div className="checkout-buttons">
              <Link to="/checkout" title="Checkout">
                <div className="left-button">Back</div>
              </Link>

              {isLoading &&
                <div className="right-button">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image-checkout' />
                </div>
              }
              
              {!isLoading &&
             <div className="right-button" onClick={this.continue}>Continue</div> 
              }

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Shipping;