import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getSingleProduct, addToBasket } from '../../lib/api'
import {seo} from '../../lib/functions'
import Navbar from '../common/Navbar';

class SingleProduct extends React.Component {
  state = {
    formData: {
      size: "",
      color: "",
      quantity: 1
    },
    totalQuantity: null,
    basketLength: null,
    product: null,
    bigImage: '',
    addedToBasket: false,
    isLoading: false,
    chosenColor: "",
    productInfo: "description"
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      const productId = this.props.match.params.id;
      const res = await getSingleProduct(productId);

      seo({
        title: res.data.name + "| NHM",
        metaDescription: res.data.description
      });

      const formData = { ...this.state.formData, size: res.data.sizes.length > 0 ? res.data.sizes[0] : "default", 
        color: res.data.colors.length  > 0 ? res.data.colors[0] : "default" };
      const totalQuantityArray = [];
      const quantityArray = [];

      if (res.data.quantities.length > 0) {

        for (let i = 1; i <= res.data.quantities[0][2]; i++) {
          totalQuantityArray.push(i);
        }

        this.setState({ product: res.data, bigImage: res.data.images[0].images[0], formData, totalQuantity: totalQuantityArray, imagesArray: res.data.images[0].images });
      
      } else {

        for (let i = 1; i <= res.data.quantity; i++) {
          quantityArray.push(i);
        }
        
        this.setState({ product: res.data, bigImage: res.data.images[0].images[0], formData, imagesArray: res.data.images[0].images, totalQuantity: quantityArray });

      }

    } catch (err) {
      console.log(err);
    }
  } 

  settingQuantity = (formData) => {
    if (this.state.product.quantities.length > 1) {
      const totalQuantityArray = [];
      const newArray = this.state.product.quantities.filter(item => {
        return (item[0] == formData.color || formData.color === "default") && (item[1] === formData.size || formData.size === "default")
      })
      for (let i = 1; i <= newArray[0][2]; i++) {
        totalQuantityArray.push(i);
      }
      this.setState({totalQuantity: totalQuantityArray})
    }
  }

  hideOverflow = () => {
    const bod = document.querySelector('body');
    
    if (window.innerHeight > bod.scrollHeight || window.innerHeight === bod.scrollHeight) {
      bod.style.overflowY = 'hidden';
      setTimeout(() => {
        bod.style.overflowY = 'visible';
      }, 1000);
    }
  }

  handleBasket = async (event) => {
    event.preventDefault();
    const btn = document.querySelector(".cart-button")
    // this.setState({ isLoading: true });
    try {
      const productId = this.props.match.params.id
      btn.classList.add('loading');

      const res = await addToBasket(productId, this.state.formData)

      setTimeout(() => {
        btn.classList.remove('loading')
        this.setState({addedToBasket: true})
      }, 2400);

      this.hideOverflow()
      // this.setState({ isLoading: false })
      this.props.basket()
    } catch (err) {
      btn.classList.remove('loading')
      console.log(err)
    }
  }

  handleChange = event => {
    if (event.target.name === "quantity") {
      const formData = { ...this.state.formData, [event.target.name]: Number(event.target.value) };
      this.setState({ formData });
      this.settingQuantity(formData)
    } else {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value };
      this.setState({ formData });
      this.settingQuantity(formData)
    }
  }

  continueShopping = () => {
    const added = document.querySelector('.basket-added-wrapper')
    added.style.animation = "0.5s added-hide linear"
    const bod = document.querySelector('body')
    if (window.innerHeight < bod.scrollHeight) {
      setTimeout(() => {
        this.setState({ addedToBasket: false });
      }, 400);
    } else if (window.innerHeight > bod.scrollHeight || window.innerHeight === bod.scrollHeight) {
      bod.style.overflowY = "hidden"
      setTimeout(() => {
        this.setState({ addedToBasket: false });
        bod.style.overflowY = "visible"
      }, 400);
    }
  }

  changeBigImage = (image) => {
    this.setState({ bigImage: image });
  }

  choosingSize = (chosenSize) => {
    const formData = { ...this.state.formData, size: chosenSize };
    this.setState({ formData });
    this.settingQuantity(formData)
  }

  choosingColor = (chosenColor) => {
    this.state.product.images.map(image => {
      if (image.color == chosenColor) {
        const formData = { ...this.state.formData, color: chosenColor };
        this.setState({ formData, chosenColor: chosenColor, imagesArray: image.images, bigImage: image.images[0] });
        this.settingQuantity(formData)
      }
    })
  }

  showImages = () => {
    this.state.product.images[0].images.map(image => {
      
      return <div className={`side-image ${image === this.state.bigImage ? "chosen-side-image" : ""}`} style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => {
        this.changeBigImage(image);
      }} key={image}></div>
    })
    
  }

  handleProductInfo = (item) => {
    this.setState({productInfo: item})
  }

  render() {
    const { product } = this.state

    if (!product) return null

    const newName = this.state.product.name.replace(/ /g, '-')

    return (
      <>
        <Navbar />
        <div className="single-product-section change-brightness">

          <style>
            {'\
          .basket-icon-wrapper{\
            display: flex;\
          }\
          '}
          </style>
        
          <div className="single-product-wrapper">
            <div className="single-product-images-wrapper">
              <div className="side-images-container">
                {this.state.imagesArray.map(image => {
      
                  return <div className={`side-image ${image === this.state.bigImage ? "chosen-side-image" : ""}`} style={{
                    backgroundImage: `url(${image})`,
                  }}
                  onClick={() => {
                    this.changeBigImage(image);
                  }} key={image}></div>
                })}
              </div>
              <div className="single-product-image" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
              </div>
            </div>
            <div className="single-product-side-info-wrapper">

              <div className="name-price-wrapper">

                <div className="single-product-name">
                  <h1>{product.name}</h1>
                </div>

                <div className="product-price-wrapper">
                  <div className="product-price">£{product.price / 100}</div>
                  {product.discount &&
                <div className="product-discount">-{product.discount}%</div>
                  }
                </div>

              </div>

              {this.state.totalQuantity.length > 0 &&

<div className="quantity-add-wrapper">

  <div className="quantity-bar">
    <label>Quantity:</label>
    <select name="quantity" onChange={this.handleChange}>

      {this.state.totalQuantity.map(item => {
        return <option key={item} value={item}>{item}</option>;
      })}
      
    </select>
  </div>

  {this.state.isLoading &&
    <div className="classic-btn btn-loading">
      <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
    </div>
  }
  {!this.state.isLoading &&
  <>
    {isAuthenticated() &&
    <button className="cart-button" onClick={this.handleBasket}>
      <span>Add to cart</span>
      <div className="cart">
        <svg viewBox="0 0 36 26">
          <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
          <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
        </svg>
      </div>
    </button>
    }
    
    {!isAuthenticated() &&
      <Link to={`/entering/${newName}/${product._id}`}>
        <button className="cart-button">
          <span>Add to cart</span>
          <div className="cart">
            <svg viewBox="0 0 36 26">
              <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
              <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
            </svg>
          </div>
        </button>
      </Link>
    }
  </>
  }
</div>

              }

              {product.sizes.length > 0 &&
            <>
              <div className="product-size-container">
                {product.sizes.map(size => {
                  return <div className={`product-size-wrapper ${this.state.formData.size === size ? "chosen-size" : ""}`} onClick={() => {
                    this.choosingSize(size);
                  }}
                  key={size}>{size}</div>;
                })}</div>
            
              <div className="product-size">Size: {this.state.formData.size}</div>
            </>
              }

              {product.colors.length > 0 &&
              <>
                <div className="product-colors-container">{product.colors.map(color => {
                  return <div className={`product-color-wrapper ${this.state.formData.color === color ? "chosen-color" : ""}`} onClick={() => {
                    this.choosingColor(color);
                  }}
                  key={color}>{color}</div>;
                })}</div>
                {/* <div className="product-size">Type: {this.state.formData.color}</div> */}
              </>
              }

              {this.state.totalQuantity.length === 0 &&
              <h2>Out Of Stock</h2>
              }

            </div>
          </div>

          {}

          <div className="product-info-container">
            <div className={`product-info-item ${this.state.productInfo === "description" ? "active" : ""}`} onClick={() => {
              this.handleProductInfo("description")
            }}>Description</div>
            {product.ingredientsText || product.ingredientsImages.length > 0 &&
            <div className={`product-info-item ${this.state.productInfo === "ingredients" ? "active" : ""}`} onClick={() => {
              this.handleProductInfo("ingredients")
            }}>Ingredients</div>
            }

            {product.usage &&
          <div className={`product-info-item ${this.state.productInfo === "usage" ? "active" : ""}`} onClick={() => {
            this.handleProductInfo("usage")
          }}>Usage</div>
            }
          </div>

          <div className="product-description">
            {this.state.productInfo === "description" &&
          <>
            <h1>Product description</h1>
            <div dangerouslySetInnerHTML={ { __html: this.state.product.description} }>
            </div>

            {product.descriptionImages.length > 0 &&
          <>
            {product.descriptionImages.map(item => {
              return <img className="img-description" alt="product description" src={item} key={item}/>
            })}
          </>
            }
          </>
            }

            {this.state.productInfo === "ingredients" &&
          <>
            {product.ingredientsImages &&
            <>
              {product.ingredientsImages.map(item => {
                return <img className="img-ingredients" alt="product ingredients" src={item} key={item}/>
              })}
            </>
            }
          </>
            }

            {this.state.productInfo === "usage" &&
          <>
            <h1>Usage</h1>
            <p>
              {this.state.product.usage}
            </p>
          </>
            }

          </div>
          {this.state.addedToBasket &&
          <div className="basket-added-wrapper">
            <h1>Item was added to your basket</h1>
            <div className="basket-added-buttons">
              <div className="basket-added-btn" onClick={this.continueShopping}>Continue Shopping</div>
              <Link to="/basket" title="checkout">
                <div className="basket-added-btn">Proceed to Checkout</div>
              </Link>
            </div>
          </div>
          }
        </div>
      </>
    )
  }
}



export default SingleProduct;