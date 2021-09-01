import React from 'react'
import { logout } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'
import { Link } from 'react-router-dom'


class Basket extends React.Component {
  state = {
    user: null,
    totalPrice: null,
    totalQuantity: null
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

  handleChange = event => {
    if (event.target.name !== "quantity") {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData })
    } else if (event.target.name === "quantity" && !isNaN(Number(event.target.value)) && Number(event.target.value) < 100) {
      const formData = { ...this.state.formData, quantity: Number(event.target.value) }
      this.setState({ formData })
    }
  }

  increaseQuantity = () => {
    const formData = { ...this.state.formData, quantity: this.state.formData.quantity + 1 }
    this.setState({ formData })
  }

  decreaseQuantity = () => {
    if (this.state.formData.quantity > 1) {
      const formData = { ...this.state.formData, quantity: this.state.formData.quantity - 1 }
      this.setState({ formData })
    }
  }


  render() {
    if (!this.state.user) return null
    const { user } = this.state
    return (
      <div className="basket-page">
        <div className="basket-container">
        {user.basket.map(item => {
          return <div className="basket-item-wrapper" key={item._id}>
            <div className="basket-image-title">
              <a href={`/products/${item._id}`} target="_blank" rel="noreferrer">
                <img src={item.images[0]} />
              </a>
              <a href={`/products/${item._id}`} target="_blank" rel="noreferrer">
                <h1>{item.name}</h1>
              </a>
            </div>
            <div className="quantity-basket-wrapper">
            Quantity:
              <div className="quantity-bar-basket">
                <div className="quantity-bar sign" onClick={this.decreaseQuantity}>-</div>
                <textarea className="quantity-bar number"
                  name="quantity"
                  onChange={this.handleChange}
                // value={this.state.formData.quantity}
                />
                <div className="quantity-bar sign" onClick={this.increaseQuantity}>+</div>
              </div>
            </div>
          </div>
        })}
        </div>
        <div className="checkout-button-total-price">
          <div className="total-price">
            Total ({this.state.totalQuantity} Items): £{this.state.totalPrice}
          </div>
          <div className="chekout-button">Proceed to Chekout</div>
        </div>
      </div>
    )
  }

}

export default Basket