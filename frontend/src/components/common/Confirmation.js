import React from 'react';
import { getMyProfile, pendingOrder } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo, mainMetaDescription} from '../../lib/functions'

class Confirmation extends React.Component {
  state = {
    user: null,
  }


  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Successful Order | Nu Hippies",
        metaDescription: {mainMetaDescription}
      });

      const res = await getMyProfile();
      this.setState({ user: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.state.user) return null;
    const {user} = this.state
    return (
      <div className="confirmation-page change-brightness">

        <h2>Thank you for your order {user.name}</h2>

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
            <div>Sum ({} Items): £{user.finishedOrder.sumPrice / 100}</div>
            <div className="total-text">Shipping: £{user.finishedOrder.shipping / 100}</div>
            <div>Total Price: £{user.finishedOrder.pricePlusShipping / 100}</div>
            <div>Your Donation: {user.finishedOrder.discount}% ({user.finishedOrder.discountAmount / 100})</div>
          </div>
        </div>

        <div className="checkout-buttons">
          <Link to="/products">
            <div className="left" onClick={this.continue}>Continue</div>
          </Link>

          <a href={user.finishedOrder.stripePaymentUrl} target="_blank" rel="noopener noreferrer" > 
            <div className="right">Go To Payment</div> 
          </a>
            
        </div>

      </div>
    )
  }
}

export default Confirmation