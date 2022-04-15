import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'

class CategoriziedProducts extends React.Component {
  state = {
    products: [],
    flowerProductsOne: [],
    flowerProductsTwo: [],
    hoveredProductId: '',
    productsShowed: 10
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getAllProducts();
      this.setState({ products: res.data.reverse() });
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
    const newProductsArrayOne = [];
    const newProductsArrayTwo = [];
    const randomNumberArray = [];

    if (this.state.products.length > 0) {
      for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * this.state.products.length);
        if (randomNumberArray.includes(randomNumber)) {
          i--;
        } else {
          i < 3 ? newProductsArrayOne.push(this.state.products[randomNumber]) : newProductsArrayTwo.push(this.state.products[randomNumber]);
          randomNumberArray.push(randomNumber);
        }
      }
    }

    this.setState({ flowerProductsOne: newProductsArrayOne, flowerProductsTwo: newProductsArrayTwo });
  }

  showMore = () => {
    this.setState({ productsShowed: this.state.productsShowed + 10 })
  }

  render() {
    const {subcategory, typeOne, typeTwo, typeThree} = this.props.match.params
    return (
      <div className="products-page categorized change-brightness">

        <div className="products-banner">
          <img id="van-moving" src="https://res.cloudinary.com/nuhippies/image/upload/v1646177431/Nu%20Hippies/Backgrounds/pngwing.com_1_ldwbgp.png" />
          {/* <video autoPlay loop muted>
            <source src="https://res.cloudinary.com/nuhippies/video/upload/v1645995711/Nu%20Hippies/Backgrounds/ezgif.com-gif-maker_1_1_bwfufy.mp4" type="video/mp4" preload="metadata" />
          </video> */}
          {/* <div className="shadow"></div> */}
        </div>

        <div className="cat-nav">

          <Link className="cat-nav-item" to={`/products`}>          
            <div>Products</div>
          </Link>

          <Link className="cat-nav-item" to={`/products/${subcategory}/all/all/all`}>          
            <div><span className="symbol">&#62;</span> {subcategory}</div>
          </Link>

          {typeOne !== "uni" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/all/all`}> 
            <div><span className="symbol">&#62;</span>{typeOne}</div>
          </Link>
          }

          {typeTwo !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}all`}> 
            <div><span className="symbol">&#62;</span>{typeTwo}</div>
          </Link>
          }

          {typeThree !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}/${typeThree}`}> 
            <div><span className="symbol">&#62;</span>{typeThree}</div>
          </Link>
          }

        </div>

        <div className="products-flower-wrapper">

          <div className="flower-container one" onScroll={this.handleScroll}>
            {this.state.flowerProductsOne.map(product => {
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

          <div className="container-more-wrapper">

            <div className="product-container">
              {this.state.products.slice(0, this.state.productsShowed).map(product => {
                if ((!product.categories.types.includes(typeOne) && typeOne !== "all") ||
              (!product.categories.types.includes(typeTwo) && typeTwo !== "all") || 
              (!product.categories.types.includes(typeThree) && typeThree !== "all") ||
              (product.categories.subCategory !== subcategory && subcategory !== "all") ){
                  return
                }

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

            <div className="more" onClick={this.showMore}>Show More <i className="fa-solid fa-caret-down"></i></div>
          
          </div>

          <div className="flower-container two" onScroll={this.handleScroll}>
            {this.state.flowerProductsTwo.map(product => {
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


export default CategoriziedProducts