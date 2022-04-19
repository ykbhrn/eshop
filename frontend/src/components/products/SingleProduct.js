import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getSingleProduct, addToBasket } from '../../lib/api'

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
      const newArray = this.state.product.quantities.find(item => {
        return (item[0] == formData.color || formData.color === "default") && item[1] == formData.size
      })
      for (let i = 1; i <= newArray[2]; i++) {
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

  handleBasket = async () => {
    this.setState({ isLoading: true });
    try {
      const productId = this.props.match.params.id
      console.log(productId, this.state.formData)
      const res = await addToBasket(productId, this.state.formData)
      console.log(res.data)
      this.hideOverflow()
      this.setState({ addedToBasket: true, isLoading: false })
      this.props.basket()
    } catch (err) {
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
        console.log(image)
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
    console.log(this.state.totalQuantity)
    return (
      <div className="single-product-section change-brightness">
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
                <div className="classic-btn" onClick={this.handleBasket}>
                  Add to basket
                </div>
                }
                {!isAuthenticated() &&
                <Link to={`/entering/${product._id}`}>
                  <div className="classic-btn">
                    Add to basket
                  </div>
                </Link>
                }
              </>
              }
            </div>

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
              return <img className="img-description" src={item} key={item}/>
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
                return <img className="img-ingredients" src={item} key={item}/>
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
              <Link to="/basket">
                <div className="basket-added-btn">Proceed to chekout</div>
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}



export default SingleProduct;