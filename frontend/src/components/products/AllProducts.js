import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'

class AllProducts extends React.Component {
  state = {
    products: [],
    flowerProducts: [],
    hoveredProductId: ''
  }

  async componentDidMount() {
    try {
      const discount = localStorage.getItem('discount')
      window.scrollTo(0, 0)
      const res = await getAllProducts();
      this.setState({ products: res.data });
      this.renderingFlowers();
    } catch (err) {
      console.log(err);
    }
  }

  otherPreviewImage = (id) => {
    this.setState({ hoveredProductId: id });
  }

  backToMainProductImage = () => {
    this.setState({ hoveredProductId: '' });
  }

  renderingFlowers = () => {
    const newProductsArray = [];
    const randomNumberArray = [];

    if (this.state.products.length > 0) {
      for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumberArray.includes(randomNumber)) {
          i--;
        } else {
          newProductsArray.push(this.state.products[randomNumber]);
          randomNumberArray.push(randomNumber);
        }
      }
    }

    this.setState({ flowerProducts: newProductsArray });
  }

  handleScroll = (event) => {
    console.log("im here", event)
  }

  render() {
    return (
      <div className="products-page change-brightness ">
        
        <div className="products-banner">
          <img src="https://res.cloudinary.com/nuhippies/image/upload/v1646066544/Nu%20Hippies/Backgrounds/pngegg_yzoovo.png" />
          {/* <video autoPlay loop muted>
            <source src="https://res.cloudinary.com/nuhippies/video/upload/v1645995711/Nu%20Hippies/Backgrounds/ezgif.com-gif-maker_1_1_bwfufy.mp4" type="video/mp4" preload="metadata" />
          </video> */}
          {/* <div className="shadow"></div> */}
        </div>

        <div className="products-flower-wrapper">

          <div className="flower-container one" onScroll={this.handleScroll}>
            {this.state.flowerProducts.map(product => {
              return <a href={`/products/${product._id}`} key={product._id}>
                <div className="flower-content">
                  <div className="flower">
                    <img src={product.images[0].images[0]} className="flowerProductImage" />
                    <div className="big-petal big-petal1"></div>
                    <div className="big-petal big-petal2"></div>
                    <div className="big-petal big-petal3"></div>
                    <div className="big-petal big-petal4"></div>
                    <div className="small-petal small-petal1"></div>
                    <div className="small-petal small-petal2"></div>
                    <div className="small-petal small-petal3"></div>
                    <div className="small-petal small-petal4"></div>
                    <div className="small-petal small-petal5"></div>
                    <div className="small-petal small-petal6"></div>
                    <div className="small-petal small-petal7"></div>
                    <div className="small-petal small-petal8"></div>
                  </div>
                </div>
              </a>
            })}
          </div>

          <div className="product-container">
            {this.state.products.slice(0).reverse().map(product => {
              return <Link to={`/products/${product._id}`} key={product._id}>
                <div className="product-wrapper" onMouseEnter={() => {
                  this.otherPreviewImage(product._id);
                }}
                onMouseLeave={this.backToMainProductImage}>
                  <div className="product-preview-image"
                    style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.images[0].images[1] : product.images[0].images[0]})` }}>
                  </div>
                  <div className="product-preview-name">{product.name}</div>
                  <div className="product-preview-price-wrapper">
                    <div className="product-preview-price">£{product.price / 100}</div>
                    {product.discount &&
                    <div className="product-preview-discount">-{product.discount}%</div>
                    }
                  </div>
                </div>
              </Link>;
            })}
          </div>

          <div className="flower-container two" onScroll={this.handleScroll}>
            {this.state.flowerProducts.map(product => {
              return <a href={`/products/${product._id}`} key={product._id}>
                <div className="flower-content">
                  <div className="flower">
                    <img src={product.images[0].images[0]} className="flowerProductImage" />
                    <div className="big-petal big-petal1"></div>
                    <div className="big-petal big-petal2"></div>
                    <div className="big-petal big-petal3"></div>
                    <div className="big-petal big-petal4"></div>
                    <div className="small-petal small-petal1"></div>
                    <div className="small-petal small-petal2"></div>
                    <div className="small-petal small-petal3"></div>
                    <div className="small-petal small-petal4"></div>
                    <div className="small-petal small-petal5"></div>
                    <div className="small-petal small-petal6"></div>
                    <div className="small-petal small-petal7"></div>
                    <div className="small-petal small-petal8"></div>
                  </div>
                </div>
              </a>
            })}
          </div>

        </div>

      </div>
    );
  }
}


export default AllProducts;