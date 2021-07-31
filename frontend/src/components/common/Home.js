import React from 'react'
import { getAllProducts } from '../../lib/api'

class Home extends React.Component {
  state = {
    products: []
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
      for (let i = 0; i < 40; i++) {
        let randomNumber = Math.floor((Math.random() * 80) / 2)
        console.log(randomNumber)
        if (randomNumberArray.includes(randomNumber)) {
          i--
        } else {
          newProductsArray.push(this.state.products[randomNumber])
          randomNumberArray.push(randomNumber)
        }
      }
    }
    return newProductsArray.map(product => {
      return <div key={product._id} className="flower-content">
        <section className="flower">
          <img src={product.imageUrl} className="productPreviewImage" />
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
        </section>
      </div>
    })
  }

  // mouseEnterFlowerContainer = () => {
  //   const flowerContainer = document.querySelector(".flower-container")
  //   setTimeout(() => {
  //     flowerContainer.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://static5.depositphotos.com/1032903/410/v/950/depositphotos_4104560-stock-illustration-vector-seamless-texture-60s.jpg")'
  //   }, 100)
  // }

  // mouseLeaveFlowerContainer = () => {
  //   const flowerContainer = document.querySelector(".flower-container")
  //   setTimeout(() => {
  //     flowerContainer.style.backgroundImage = 'url("https://static5.depositphotos.com/1032903/410/v/950/depositphotos_4104560-stock-illustration-vector-seamless-texture-60s.jpg")'
  //   }, 100)
  // }

  render() {
    return (
      <>
        <main>
          <div className="flower-container" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.renderingFlowers()}
          </div>
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-home">asdas</i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-gears"></i>
              </a>
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
                <i className="fa fa-times"></i>
              </a>
            </li>
          </ul>
          <div className="menu-container">
            <span></span>
            <div className="wrap">
              <a href="#"><div>Muie</div></a>
              <a href="#"><div></div></a>
              <a href="#"><div></div></a>
              <a href="#"><div></div></a>
              <a href="#"><div></div></a>
            </div>
          </div>
          {/* <div className="flower-container two" onMouseEnter={this.mouseEnterFlowerContainer} onMouseLeave={this.mouseLeaveFlowerContainer}>
            {this.renderingFlowers()}
          </div> */}
          {/* {this.state.products.map(product => {
            return <div key={product._id}>{product.name}</div>
          })} */}
        </main>
        <section className="footer">
        </section>
      </>
    )
  }
}

export default Home