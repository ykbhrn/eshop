import React from 'react'
import { Link } from 'react-router-dom'
import { getSingleProduct, addToBasket, basketLength } from '../../lib/api'


class SingleProduct extends React.Component {
  state = {
    formData: {
      size: "",
      color: '',
      quantity: 1
    },
    basketLength: null,
    product: null,
    bigImage: '',
    addedToBasket: false,
    isLoading: false
  }

  async componentDidMount() {
    try {
      const productId = this.props.match.params.id
      const res = await getSingleProduct(productId)
      const formData = { ...this.state.formData, size: res.data.sizes[0], color: res.data.colors[0]}
      this.setState({ product: res.data, bigImage: res.data.images[0], formData })
    } catch (err) {
      console.log(err)
    }
  }

  handleBasket = async () => {
    try {
      const productId = this.props.match.params.id
      const res = await addToBasket(productId, this.state.formData)
      console.log(res.data)
      this.setState({ addedToBasket: true })
      this.props.basket()
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

  continueShopping = () => {
    this.setState({ addedToBasket: false })
  }

  changeBigImage = (image) => {
    this.setState({ bigImage: image })
  }

  choosingSize = (chosenSize) => {
    const formData = { ...this.state.formData, size: chosenSize}
    this.setState({ formData })
  }

  choosingColor = (chosenColor) => {
    const formData = { ...this.state.formData, color: chosenColor}
    this.setState({ formData })
  }

  increaseQuantity = () => {
    const formData = { ...this.state.formData, quantity: this.state.formData.quantity + 1}
    this.setState({ formData})
  }

  decreaseQuantity = () => {
    if (this.state.formData.quantity > 1) {
      const formData = { ...this.state.formData, quantity: this.state.formData.quantity - 1}
      this.setState({ formData})
    }
  }

  render() {
    const { product } = this.state
    if (!product) return null
    return (
      <div className="single-product-section">
        <div className="single-product-wrapper">
          <div className="single-product-images-wrapper">
            <div className="side-images-container">
              {product.images.map(image => {
                return <div className="side-image" style={{
                  backgroundImage: `url(${image})`,
                  filter: `brightness(${image === this.state.bigImage ? "1" : "0.6"})`,
                  border: `${image === this.state.bigImage ? "1px solid red" : "1px solid black"}`
                }}
                onClick={() => {
                  this.changeBigImage(image)
                }} key={image}></div>
              })}
            </div>
            <div className="single-product-image" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
            </div>
          </div>
          <div className="name-price-wrapper">
            <div className="single-product-name">
              <h1>{product.name}</h1>
            </div>
            <div className="product-price-wrapper">
              <div className="product-price">£{product.price}</div>
              {product.discount &&
                <div className="product-discount">-{product.discount}%</div>
              }
            </div>
            <div className="product-size-container">{product.sizes.map(size => {
              return <div className={`product-size-wrapper ${this.state.formData.size === size ? "chosen-size" : ""}`} onClick={() => {
                this.choosingSize(size)
              }}
              key={size}>{size}</div>
            })}</div>
            <div className="product-size">Size: {this.state.formData.size}</div>
            {this.state.formData.color &&
              <>
                <div className="product-colors-container">{product.colors.map(color => {
                  return <div className={`product-color-wrapper ${this.state.formData.color === color ? "chosen-color" : ""}`} onClick={() => {
                    this.choosingColor(color)
                  }}
                  key={color}>{color}</div>
                })}</div>
                <div className="product-size">Color: {this.state.formData.color}</div>
              </>
            }
            <div className="quantity-basket-wrapper">
              <div className="quantity-bar-wrapper">
                <div className="quantity-bar sign" onClick={this.decreaseQuantity}>-</div>
                <textarea className="quantity-bar number"
                  name="quantity"
                  onChange={this.handleChange}
                  value={this.state.formData.quantity}
                />
                <div className="quantity-bar sign" onClick={this.increaseQuantity}>+</div>
              </div>
              <div className="add-to-basket-wrapper" onClick={this.handleBasket}>
                ADD TO BASKET
              </div>
            </div>
          </div>
        </div>
        <div className="product-description">
          <h1>Product description</h1>
          {this.state.product.description}
        </div>
        {this.state.addedToBasket &&
        <div className="basket-added-wrapper">
          <div className="basket-added-continue" onClick={this.continueShopping}>Continue Shopping</div>
          <div className="basket-added-proceed">Proceed to chekout</div>
        </div>
        }
      </div>
    )
  }
}



export default SingleProduct