import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

class Home extends React.Component {
  state = {
    products: [],
    images: []
  }

  async componentDidMount() {
    try {
      const res = await getAllProducts()
      this.setState({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  renderingFlowers = () => {
    const newProductsArray = []
    const randomNumberArray = []
    if (this.state.products.length > 0) {
      for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 10)
        if (randomNumberArray.includes(randomNumber)) {
          i--
        } else {
          newProductsArray.push(this.state.products[randomNumber])
          randomNumberArray.push(randomNumber)
        }
      }
    }
    return newProductsArray.map(product => {
      console.log(product)
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
    })
  }

  render() {
    return (
      <>
        <section className="home">
          <div className="flower-container one" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.renderingFlowers()}
          </div>
          <div className="home-menu">
            <ul>
              <li>
                <a href="/products">
                  <i className="fas fa-tshirt"></i>
                </a>
              </li>
              <li>
                {!isAuthenticated() &&
                  <a href="/entering">
                    <i className="fas fa-user"></i>
                  </a>
                }
                {isAuthenticated() &&
                  <a href="/profile">
                    <i className="fas fa-user"></i>
                  </a>
                }
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-users"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-sitemap"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-tags"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-gamepad"></i>
                </a>
              </li>
              <li className="close">
                <a href="#">
                  <i className="fas fa-peace"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="flower-container two" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.renderingFlowers()}
          </div>
        </section>
      </>
    )
  }
}


export default Home