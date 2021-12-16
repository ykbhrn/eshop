import React from 'react';
import { getMyProfile, addShipping } from '../../lib/api';
import { Link } from 'react-router-dom';


class Shipping extends React.Component {
  state = {
    user: null,
    shipping: 3.99
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getMyProfile();
      let priceSum = 0;
      let basketSize = 0;
      res.data.basket.map(item => {
        priceSum = priceSum + (item.chosenQuantity * item.price);
        basketSize = basketSize + Number(item.chosenQuantity);
      });
      this.setState({ user: res.data, totalPrice: priceSum, totalQuantity: basketSize, shipping: res.data.pendingOrder.shipping });
    } catch (err) {
      console.log(err);
    }
  }

  handleShipping = async (event) => {
    const formData = { shipping: event.target.value };
    try {
      await addShipping(formData);
      this.componentDidMount();
      this.setState({ expressShipping: this.state.expressShipping === true ? false : true });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.state.user) return null;
    const { user } = this.state;
    return (
      <div className="shipping-page">
        <div className="shipping-radio">
          <h2>Shipping options:</h2>
          <div className="shipping-option">
            <div className="shipping-option-name-radio">
              <input
                type="radio"
                value={3.99}
                onChange={this.handleShipping}
                checked={this.state.shipping === 3.99}
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
                value={6.99}
                onChange={this.handleShipping}
                checked={this.state.shipping === 6.99}
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
          {user.basket.map(item => {            
            return <div key={item.id} className="image-checkout-wrapper"> 
              <div className="image-checkout" style={{
                backgroundImage: `url(${item.images[0]})`
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
          <div className="total-price-checkout-wrapper">
            <div className="total-text">({this.state.totalQuantity} Items): £{this.state.totalPrice}</div>
            <div className="total-text">Shipping: £{user.pendingOrder.shipping}</div>
            <div className="total-text">Total price: £{this.state.totalPrice + user.pendingOrder.shipping}</div>
          </div>
          <div className="checkout-buttons">
            <Link to="/checkout">
              <button className="left">Go Back To Shipping Adress</button>
            </Link>
            <Link to="/payment">
              <button className="right">Continue To Payment</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Shipping;