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

  render() {
    if (!this.state.user) return null;
    const {user} = this.state
    return (
      <div className="confirmation-page">

        <h2>Order Details:</h2>
        <div className="total-price-checkout-wrapper">
          <div>Order ID: {user.finishedOrder.orderId}</div>
          <div>Sum ({} Items): £{user.finishedOrder.sumPrice}</div>
          <div>Your Discount: {user.finishedOrder.discount}% (£{ Math.round(((user.finishedOrder.discount / 100) * user.finishedOrder.sumPrice * 100)) / 100})</div>
          <div className="total-text">Shipping: £{user.finishedOrder.shipping}</div>
          <div>Total Price: £{user.finishedOrder.totalPrice + user.finishedOrder.shipping}</div>
        </div>
       
      </div>
    )
  }
}

export default Confirmation