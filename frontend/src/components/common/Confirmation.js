import React from 'react';
import { getMyProfile, pendingOrder } from '../../lib/api';
import { Link } from 'react-router-dom';

class Confirmation extends React.Component {
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

  continue = () => {
    window.location.assign('/products')
  }

  render() {
    if (!this.state.user) return null;
    const {user} = this.state
    return (
      <div className="confirmation-page">

        <h2>Thank you for your purchase {user.name}</h2>

        <h3>Order Details:</h3>
        <div className="total-price-checkout-wrapper">

          <div className="order-items-container">
            {user.finishedOrder.items.map(item => {
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
        
          <div className="order-confirmation-details">
            <div>Order ID: {user.finishedOrder.orderId}</div>
            <div>Sum ({} Items): £{user.finishedOrder.sumPrice}</div>
            <div>Your Discount: {user.finishedOrder.discount}% (£{ Math.round(((user.finishedOrder.discount / 100) * user.finishedOrder.sumPrice * 100)) / 100})</div>
            <div className="total-text">Shipping: £{user.finishedOrder.shipping}</div>
            <div>Total Price: £{user.finishedOrder.totalPrice + user.finishedOrder.shipping}</div>
          </div>
        </div>
      
        <div className="classic-btn" onClick={this.continue}>Continue</div>
      </div>
    )
  }
}

export default Confirmation