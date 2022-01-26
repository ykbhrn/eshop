import React from 'react';
import { getMyProfile, completeOrder, createOrder } from '../../lib/api';
import { Link } from 'react-router-dom';

class Payment extends React.Component {
  state = {
    user: null,
    formData: {
      fullName: null,
      company: null,
      adressLineOne: null,
      adressLineTwo: null,
      town: null,
      postcode: null,
      country: null
    },
    billingAdress: false,
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
      console.log(res.data)
      const resTwo = await createOrder(res.data)
      if (type === 'credit-card') {
        window.location.assign('/payment-getaway')
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

          {this.state.creditCard &&
            <>
              <label>Card Number:</label>
              <input
                name="cardNumber"
                onChange={this.handleChange}
                value={formData.fullName}
              />

              <label>Name on card:</label>
              <input
                name="nameOnCard"
                onChange={this.handleChange}
                value={formData.company}
              />

              <label>Expiration data (MM/YY):</label>
              <input
                name="expiration"
                onChange={this.handleChange}
                value={formData.adressLineOne}
              />

              <label>Security code:</label>
              <input
                name="security"
                onChange={this.handleChange}
                value={formData.adressLineTwo}
              />
            </>
          }

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
          {this.state.bankTransfer &&
            <div>We will send you payment instructions in the e-mail.</div>
          }
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