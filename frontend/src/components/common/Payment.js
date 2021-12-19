import React from 'react';
import { getMyProfile, completeOrder } from '../../lib/api';
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
    paypal: false,
    bankTransfer: false
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
      this.setState({ creditCard: true, paypal: false, bankTransfer: false });
    } else if (event.target.name === "paypal") {
      this.setState({ creditCard: false, paypal: true, bankTransfer: false });
    } else if (event.target.name === "bank transfer") {
      this.setState({ creditCard: false, paypal: false, bankTransfer: true });
    }
  }

  async completeOrder () {
    try {
      const res = await completeOrder()
      return window.location.assign('/done')
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
              name="paypal"
              type="radio"
              value="2"
              onChange={this.radioChange}
              checked={this.state.paypal}
            />
            <label><img className="paypal-icon" src="https://res.cloudinary.com/nuhippies/image/upload/v1639598403/Nu%20Hippies/icons/paypal_aowslf.png" /></label>
          </div>
          {this.state.paypal &&
            <div>After completing your order you will be redirected to paypal page for payment.</div>
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
            <div>Sum ({this.state.totalQuantity} Items): £{user.sumPrice}</div>
            <div>Your Discount: {user.discount}% (£{((user.discount / 100) * user.sumPrice)})</div>
            <div className="total-text">Shipping: £{user.pendingOrder.shipping}</div>
            <div>Total Price: £{user.totalPrice + user.pendingOrder.shipping}</div>

          </div>
          <div className="checkout-buttons">
            <Link to="/shipping">
              <button className="left">Go Back To Shipping</button>
            </Link>
            <button className="right" onClick={this.completeOrder}>Complete Your Order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;