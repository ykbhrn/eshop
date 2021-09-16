import React from 'react'
import { getMyProfile } from '../../lib/api'
import { Link } from 'react-router-dom'


class Checkout extends React.Component {
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
    billingAdress: false
  }

  async componentDidMount() {
    try {
      const res = await getMyProfile()
      let priceSum = 0
      let basketSize = 0
      res.data.basket.map(item => {
        priceSum = priceSum + (item.chosenQuantity * item.price)
        basketSize = basketSize + Number(item.chosenQuantity)
      })
      this.setState({ user: res.data, totalPrice: priceSum, totalQuantity: basketSize })
    } catch (err) {
      console.log(err)
    }
  }

  radioChange = () => {
    this.setState({ billingAdress: this.state.billingAdress ? false : true })
  }

  render() {
    if (!this.state.user) return null
    const { user, formData } = this.state
    return (
      <div className="checkout-page">

        <div className="forms-wrapper">
        <h2>Shipping Adress:</h2>
        <form className="checkout-form">
          <label>Full Name:</label>
          <input
            name="fullName"
            onChange={this.handleChange}
            value={formData.fullName}
          />

          <label>Company (Optional):</label>
          <input
            name="company"
            onChange={this.handleChange}
            value={formData.company}
          />

          <label>Adress Line 1:</label>
          <input
            name="adressLineOne"
            onChange={this.handleChange}
            value={formData.adressLineOne}
          />

          <label>Adress Line 2 (optional):</label>
          <input
            name="adressLineTwo"
            onChange={this.handleChange}
            value={formData.adressLineTwo}
          />

          <label>City/Town:</label>
          <input
            name="town"
            onChange={this.handleChange}
            value={formData.town}
          />

          <label>Postcode:</label>
          <input
            name="postcode"
            onChange={this.handleChange}
            value={formData.postcode}
          />

          <label>Country:</label>
          <input
            name="country"
            onChange={this.handleChange}
            value={formData.country}
          />
        </form>

        <div className="billing-radio">
          <h2>Billing Adress:</h2>
          <div>
          <input
              name="billing"
              type="radio"
              value="1"
              onChange={this.radioChange}
              checked={!this.state.billingAdress}
            />
            <label>Same as shipping adress:</label>
          </div>

          <div>
          <input
              name="billing"
              type="radio"
              value="1"
              onChange={this.radioChange}
              checked={this.state.billingAdress}
            />
            <label>Use diffent one:</label>
          </div>
        </div>

        {this.state.billingAdress &&
          <form className="checkout-form">
            <label>Full Name:</label>
            <input
              name="fullName"
              onChange={this.handleChange}
              value={formData.fullName}
            />

            <label>Company (Optional):</label>
            <input
              name="company"
              onChange={this.handleChange}
              value={formData.company}
            />

            <label>Adress Line 1:</label>
            <input
              name="adressLineOne"
              onChange={this.handleChange}
              value={formData.adressLineOne}
            />

            <label>Adress Line 2 (optional):</label>
            <input
              name="adressLineTwo"
              onChange={this.handleChange}
              value={formData.adressLineTwo}
            />

            <label>City/Town:</label>
            <input
              name="town"
              onChange={this.handleChange}
              value={formData.town}
            />

            <label>Postcode:</label>
            <input
              name="postcode"
              onChange={this.handleChange}
              value={formData.postcode}
            />

            <label>Country:</label>
            <input
              name="country"
              onChange={this.handleChange}
              value={formData.country}
            />
          </form>
        }
        <div className="checkout-buttons">
            <Link to="/basket">
              <button>Go Back To Basket</button>
            </Link>
            <Link to="/shipping">
              <button>Continue To Shipping</button>
            </Link>
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
            </div>
          })}
          <div className="total-price-checkout-wrapper">
            ({this.state.totalQuantity} Items): £{this.state.totalPrice} <br/>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout