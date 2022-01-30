import React from 'react';
import { getMyProfile, completeOrder, createOrder, createInvoice } from '../../lib/api';
import { Link } from 'react-router-dom';

class Payment extends React.Component {
  state = {
    user: null,
    creditCard: true,
    bankTransfer: false,
    paymentType: "credit-card"
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
      this.setState({ user: res.data, totalPrice: priceSum, totalQuantity: basketSize });
    } catch (err) {
      console.log(err);
    }
  }

  radioChange = (event) => {
    if (event.target.name === "credit card") {
      this.setState({ creditCard: true, bankTransfer: false, paymentType: "credit-card" });
    } else if (event.target.name === "bank transfer") {
      this.setState({ creditCard: false, bankTransfer: true, paymentType: "bank-transfer" });
    }
  }

  async completeOrder (type) {
    try {
      const formData = {paymentType: type}
      const res = await completeOrder(type, formData)
      const resOrder = await createOrder(res.data)
      console.log(resOrder.data.pricePlusShipping)
      const resInvoice = await createInvoice({
        totalPrice: resOrder.data.pricePlusShipping,
        username: resOrder.data.name,
        userEmail: resOrder.data.email,
        customerId: "cus_L3qEXUkGSc7Imu"
      })
      console.log(resInvoice.data)
      if (type === 'credit-card') {
        window.location.assign(resInvoice.data.message)
      } else {
        window.location.assign(`/confirmation/${type}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.user) return null;
    const { user, formData } = this.state;
    return (
      <div className="payment-page">

        <div className="payment-radio">
          <h2>Payment options:</h2>
          <div className="payment-option">
            <input
              name="credit card"
              type="radio"
              value="1"
              onChange={this.radioChange}
              checked={this.state.creditCard}
            />
            <label>Debit or Credit Card</label>
          </div>

          <div className="payment-option">
            <input
              name="bank transfer"
              type="radio"
              value="2"
              onChange={this.radioChange}
              checked={this.state.bankTransfer}
            />
            <label>Bank Transfer</label>
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
            <div>Your Discount: {user.discount}% (£{ Math.round(((user.discount / 100) * user.sumPrice * 100)) / 100})</div>
            <div className="total-text">Shipping: £{user.pendingOrder.shipping / 100}</div>
            <div>Total Price: £{(user.totalPrice + user.pendingOrder.shipping) / 100}</div>
          </div>

          <div className="checkout-buttons">
            <Link to="/shipping">
              <button className="left">Go Back To Shipping</button>
            </Link>
            {this.state.bankTransfer &&
              <button className="right" onClick={() => {
                this.completeOrder(this.state.paymentType)
              }}>Complete Your Order</button>
            }

            {this.state.creditCard &&
              <button className="right" onClick={() => {
                this.completeOrder(this.state.paymentType)
              }}>Continue to Payment</button>
            }
            
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;