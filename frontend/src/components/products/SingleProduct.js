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
    totalQuantity: null,
    basketLength: null,
    product: null,
    bigImage: '',
    addedToBasket: false,
    isLoading: false,
  }

  async componentDidMount() {
    try {
      const productId = this.props.match.params.id
      const res = await getSingleProduct(productId)
      const formData = { ...this.state.formData, size: res.data.sizes[0], color: res.data.colors[0] }
      const totalQuantityArray = []
      for (let i = 1; i <= res.data.quantity; i++) {
        totalQuantityArray.push(i)
      }
      this.setState({ product: res.data, bigImage: res.data.images[0], totalQuantity: totalQuantityArray, formData })
    } catch (err) {
      console.log(err)
    }
  }

  hideOverflow = () => {
    const bod = document.querySelector('body')
    bod.style.overflowY = 'hidden'
    setTimeout(() => {
      bod.style.overflowY = 'visible'
    }, 1000);
  }

  handleBasket = async () => {
    this.setState({ isLoading: true })
    try {
      const productId = this.props.match.params.id
      const res = await addToBasket(productId, this.state.formData)
      this.hideOverflow()
      this.setState({ addedToBasket: true, isLoading: false })
      this.props.basket()
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    if (event.target.name === "quantity") {
      const formData = { ...this.state.formData, [event.target.name]: Number(event.target.value) }
      this.setState({ formData })
    } else {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
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
    const formData = { ...this.state.formData, size: chosenSize }
    this.setState({ formData })
  }

  choosingColor = (chosenColor) => {
    const formData = { ...this.state.formData, color: chosenColor }
    this.setState({ formData })
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

            <div className="quantity-add-wrapper">
              <div className="quantity-bar">
                <label>Quantity:</label>
                <select name="quantity" onChange={this.handleChange}>
                  {this.state.totalQuantity.map(item => {
                    return <option key={item} value={item}>{item}</option>
                  })}
                </select>
              </div>
              {this.state.isLoading &&
                <div className="add-to-basket-wrapper">
                  <img src='/images/loading.svg' className='loading-image' />
                </div>
              }
              {!this.state.isLoading &&
                <div className="add-to-basket-wrapper" onClick={this.handleBasket}>
                  Add to basket
                </div>
              }
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
            <Link to="/basket">
              <div className="basket-added-proceed">Proceed to chekout</div>
            </Link>
          </div>
        }
      </div>
    )
  }
}



export default SingleProduct