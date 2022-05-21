import React from 'react';
import { getMyProfile, completeOrder, createOrder, createInvoice } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo, mainMetaDescription} from '../../lib/functions'

class Payment extends React.Component {
  state = {
    user: null,
    creditCard: true,
    bankTransfer: false,
    paymentType: "credit-card",
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Payment Options | Nu Hippies",
        metaDescription: {mainMetaDescription}
      });

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
      this.setState({ isLoading: true })
      const formData = {paymentType: type}
      const res = await completeOrder(type, formData)
      const resOrder = await createOrder(res.data)
      console.log(resOrder.data.pricePlusShipping)
      const resInvoice = await createInvoice({
        customerId: this.state.user.stripeId,
        order: resOrder.data
      })
      console.log(resInvoice.data)
      if (type === 'credit-card') {
        // window.open(resInvoice.data.message)
        window.location.assign(`/confirmation/${type}`)
      } else {
        window.location.assign(`/confirmation/${type}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.user) return null;
    const { user, formData, isLoading } = this.state;
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

          {/* <div className="payment-option">
            <input
              name="bank transfer"
              type="radio"
              value="2"
              onChange={this.radioChange}
              checked={this.state.bankTransfer}
            />
            <label>Bank Transfer</label>
          </div> */}

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
            <div className="total-text">Shipping: £{user.pendingOrder.shipping / 100}</div>
            <div>Total Price: ({this.state.totalQuantity} Items): £{(user.totalPrice + user.pendingOrder.shipping) / 100}</div>
            <div>Your Donation: {user.discount}% (£{user.discountAmount / 100})</div>
          </div>

          <div className="checkout-buttons">
            <Link to="/shipping" title="Shipping">
              <div className="left">Back</div>
            </Link>

            {isLoading &&
                <div className="right">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image-checkout' />
                </div>
            }
            {!isLoading &&
             <div className="right" onClick={() => {
               this.completeOrder(this.state.paymentType)
             }}>Complete Your Order</div> 
            }
            
          </div>

        </div>
      </div>
    );
  }
}

export default Payment;