import React from 'react';
import { getMyProfile, completeOrder, createOrder, createInvoice } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo, mainMetaDescription} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class Payment extends React.Component {
  state = {
    user: null,
    creditCard: true,
    bankTransfer: false,
    paymentType: "credit-card",
    isLoading: false,
    error: ''
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
      this.setState({ isLoading: true, error: '' })
      const formData = {paymentType: type}
      const res = await completeOrder(type, formData)
      const resOrder = await createOrder(res.data)
      const resInvoice = await createInvoice({
        customerId: this.state.user.stripeId,
        order: resOrder.data
      })

      const paymentUrl = resInvoice.data && resInvoice.data.success
        ? resInvoice.data.message
        : null

      if (type === 'credit-card') {
        if (!paymentUrl) {
          throw new Error('No payment link was returned')
        }

        // Stripe's hosted payment page. This runs after an await, so a popup
        // blocker can veto window.open - fall back to this tab if it does.
        const stripeWindow = window.open(paymentUrl, '_blank')

        if (!stripeWindow) {
          window.location.assign(paymentUrl)
          return
        }
      }

      window.location.assign(`/confirmation/${type}`)
    } catch (err) {
      console.log(err)

      const serverMessage = err.response && err.response.data && err.response.data.message

      this.setState({
        isLoading: false,
        error: serverMessage
          ? `${serverMessage}. Please try again, or choose bank transfer.`
          : 'We could not complete your order. Please try again.'
      })
    }
  }

  render() {
    if (!this.state.user) return null;
    const { user, formData, isLoading } = this.state;
    return (
      <>
        <SecondHandNavbar />

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
              <div>Sum ({this.state.totalQuantity}  {this.state.totalQuantity > 1 ? " Items" : " Item"}): £{user.sumPrice / 100}</div>
              <div>Your Discount: {user.discount}% (£{user.discountAmount / 100})</div>
              <div className="total-text">Shipping: £{user.pendingOrder.shipping / 100}</div>
              <div>Total Price: £{(user.totalPrice + user.pendingOrder.shipping) / 100}</div>
            </div>

            {this.state.error &&
              <small className="error-message">{this.state.error}</small>
            }

            <div className="checkout-buttons">
              <Link to="/shipping" title="Shipping">
                <div className="left-button">Back</div>
              </Link>

              {isLoading &&
                <div className="right-button">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image-checkout' />
                </div>
              }
              {!isLoading &&
             <div className="right-button" onClick={() => {
               this.completeOrder(this.state.paymentType)
             }}>Complete</div> 
              }
            
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default Payment;