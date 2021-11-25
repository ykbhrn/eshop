import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';

class Home extends React.Component {
  state = {
    products: [],
    flowerProducts: [],
    images: [],
    mainButton: ""
  }

  async componentDidMount() {
    try {
      const res = await getAllProducts();
      this.setState({ products: res.data });
      this.renderingFlowers();
    } catch (err) {
      console.log(err);
    }
  }

  changeMainButton = (hoveredItem) => {
    this.setState({ mainButton: hoveredItem });
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" });
  }

  renderingFlowers = () => {
    const newProductsArray = [];
    const randomNumberArray = [];
    if (this.state.products.length > 0) {
      for (let i = 0; i < 4; i++) {
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

  render() {
    return (
      <>
        <div className="home-page">
          <style>
            {'\
          .basket-icon-wrapper{\
            display: none;\
          }\
          .main-menu-wrapper{\
            display: none;\
          }\
          .products-navbar-item{\
            display: none;\
          }\
          .hover-products-menu{\
            display: none;\
          }\
          '}
          </style>
          <div className="flower-container one" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.state.flowerProducts.map(product => {
              return <Link to={`/products/${product._id}`} key={product._id}>
                <div className="flower-content">
                  <div className="flower">
                    <img src={product.images[0]} className="flowerProductImage" />
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
              </Link>;
            })}
          </div>
          <div className="home-menu">
            <ul>
              <li>
                <Link to="/products" onMouseEnter={() => {
                  this.changeMainButton("Clothes");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fas fa-tshirt"></i>
                </Link>
              </li>
              <li>
                {!isAuthenticated() &&
                  <Link to="/entering" onMouseEnter={() => {
                    this.changeMainButton("Register");
                  }}
                  onMouseLeave={this.mainButtonBack}>
                    <i className="fas fa-user"></i>
                  </Link>
                }
                {isAuthenticated() &&
                  <Link to="/profile" onMouseEnter={() => {
                    this.changeMainButton("My Account");
                  }}
                  onMouseLeave={this.mainButtonBack}>
                    <i className="fas fa-user"></i>
                  </Link>
                }
              </li>
              <li>
                <Link to="#" onMouseEnter={() => {
                  this.changeMainButton("Nothing");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fa fa-users"></i>
                </Link>
              </li>
              <li>
                <Link to="/about" onMouseEnter={() => {
                  this.changeMainButton("About Us");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fab fa-angellist flip"></i>
                </Link>
              </li>
              <li>
                <Link to="/contact" onMouseEnter={() => {
                  this.changeMainButton("Contact Us");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fas fa-envelope-open-text"></i>
                </Link>
              </li>
              <li>
                <Link to="#" onMouseEnter={() => {
                  this.changeMainButton("Accessories");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fab fa-redhat"></i>
                </Link>
              </li>
              <li className="close">
                <Link to="#">
                  {this.state.mainButton &&
                    <div className="home-menu-button-text">{this.state.mainButton}</div>
                  }
                  {!this.state.mainButton &&
                    <div><i className="fas fa-peace"></i></div>
                  }
                </Link>
              </li>
            </ul>
          </div>
          <div className="flower-container two" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.state.flowerProducts.map(product => {
              return <Link to={`/products/${product._id}`} key={product._id}>
                <div className="flower-content">
                  <div className="flower">
                    <img src={product.images[0]} className="flowerProductImage" />
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
              </Link>
            })}
          </div>
        </div>
      </>
    );
  }
}


export default Home;