import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'


class Navbar extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: "",
    isClothing: null,
    showProductsNavbar: false
  }

  changeMainButton = (hoveredItem) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      this.setState({ mainButton: hoveredItem })
    }
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  productsMenuHover = (item) => {
    // const menuItems = document.querySelectorAll(".products-navbar-item")
    const productsHoverMenu = document.querySelector(".hover-products-menu")

    productsHoverMenu.style.display = "flex"
    productsHoverMenu.style.animation = "0.3s menu-in linear"
    // if (item === "clothing") {
    //   menuItems[0].classList.add("active")
    //   menuItems[1].classList.remove("active")
    //   this.setState({isClothing: true})
    // } else if (item === "accesories") {
    //   menuItems[1].classList.add("active")
    //   menuItems[0].classList.remove("active")
    //   this.setState({isClothing: false})
    // }  
  }

  productsMenuLeave = () => {
    // const menuItems = document.querySelectorAll(".products-navbar-item")
    const productsHoverMenu = document.querySelector(".hover-products-menu")

    // menuItems[0].classList.remove("active")
    // menuItems[1].classList.remove("active")
    setTimeout(() => {
      productsHoverMenu.style.display = "none"
    }, 195);
  }

  render() {
    console.log(this.state.showProductsNavbar)
    return (
      <header className="navbar">
        <style>
          {'\
          .hover-products-menu{\
            display: none;\
          }\
          '}
        </style>
        <div className="products-navbar change-brightness">

          <div className="products-navbar-icon" onClick={() => {
            this.productsMenuHover("clothing")
          }} >
          </div>
          
          <div className="hover-products-menu">

            <div className="products-menu-close" onClick={this.productsMenuLeave}>
              X
            </div>

            {/* <div className="products-navbar-item-wrapper">
              <Link to="/products/clothing/uni/all"><div className="products-navbar-item" onMouseEnter={() => {
                this.productsMenuHover("clothing")
              }}>Clothing</div>
              </Link>
              <Link to="/products/accesories/uni/all"><div className="products-navbar-item" onMouseEnter={() => {
                this.productsMenuHover("accesories")
              }}>Accesories</div>
              </Link>
            </div> */}

            {/* Products navbar */}
            {/* Clothes */}
            <div className="hover-products-menu-wrapper change-brightness">
                           
              <nav><input className="toggle" id="nav" type="checkbox" /><label className="label" htmlFor="nav">
                <p>Clothes</p><span className="hum"><i className="fa-solid fa-bars"></i></span>
                <ul className="list">
                  <li className="list__home"><a href="#0">Uni</a>
                    <ul className="list__homeItems">
                      <li><a href="#0">T-Shirts</a></li>
                      <li><a href="#0">Hoodies</a></li>
                      <li><a href="#0">Sweatshirts</a></li>
                    </ul>
                  </li>
                  <li className="list__clients"><a href="#0">Men&apos;s</a>
                    <ul className="list__clientsItems">
                      <li><a href="#0">T-Shirts</a></li>
                      <li><a href="#0">Hoodies</a></li>
                      <li><a href="#0">Sweatshirts</a></li>
                    </ul>
                  </li>
                  <li className="list__strauss"><a href="#0">Women&apos;s</a>
                    <ul className="list__straussItem">
                      <li><a href="#0">T-Shirts</a></li>
                      <li><a href="#0">Hoodies</a></li>
                      <li><a href="#0">Sweatshirts</a></li>
                    </ul>
                  </li>
                  <li className="list__contact"><a href="#0">Kid&apos;s</a>
                    <ul className="list__contactItem">
                      <li><a href="#0">T-Shirts</a></li>
                      <li><a href="#0">Hoodies</a></li>
                      <li><a href="#0">Sweatshirts</a></li>
                    </ul>
                  </li>
                </ul>
              </label></nav>

              {/* Accesories */}

              <nav><input className="toggle" id="nav-two" type="checkbox" /><label className="label" htmlFor="nav-two">
                <p>Accesories</p><span className="hum"></span>
                <ul className="list">
                  <li className="list__home"><a href="#0">Bags</a></li>
                  <li className="list__about"><a href="#0">Scarfs</a></li>
                  <li className="list__clients"><a href="#0"><span>Some</span></a>
                    <ul className="list__clientsItems">
                      <li><a href="#0">Burger King</a></li>
                      <li><a href="#0">Southwest Airlines</a></li>
                      <li><a href="#0">Levi Strauss</a></li>
                    </ul>
                  </li>
                  <li className="list__strauss"><a href="#0"><span>Services</span></a>
                    <ul className="list__straussItem">
                      <li><a href="#0">Print Design</a></li>
                      <li><a href="#0">Web Design</a></li>
                      <li><a href="#0">Mobile App Development</a></li>
                    </ul>
                  </li>
                  <li className="list__contact"><a href="#0">Contact</a></li>
                </ul>
              </label></nav>

            </div>
              
            {/* {this.state.isClothing &&
            <div className="gender-navbar-part-wrapper">
            
              <div className="gender-navbar-part">
                <Link to="/products/clothing/men/all"><h3>Men&apos;s Clothing</h3></Link>
                <Link to="/products/clothing/men/t-shirts"><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/clothing/men/hoodies"><div className="small-item">Hoodies</div></Link>
                <Link to="/products/clothing/men/sweatshirts"><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/clothing/men/trousers"><div className="small-item">Trousers</div></Link>
              </div>

              <div className="gender-navbar-part">
                <Link to="/products/clothing/women/all"><h3>Women&apos;s Clothing</h3></Link>
                <Link to="/products/clothing/women/t-shirts"><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/clothing/women/hoodies"><div className="small-item">Hoodies</div></Link>
                <Link to="/products/clothing/women/sweatshirts"><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/clothing/women/trousers"><div className="small-item">Trousers</div></Link>
              </div>
            </div>
            }

            {!this.state.isClothing &&
            <div className="gender-navbar-part-wrapper">
              <div className="gender-navbar-part">
                <Link to="/products/accesories/men/all"><h3>Men&apos;s Accesories</h3></Link>
                <Link to="/products/accesories/men/t-shirts"><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/accesories/men/hoodies"><div className="small-item">Hoodies</div></Link>
                <Link to="/products/accesories/men/sweatshirts"><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/accesories/men/trousers"><div className="small-item">Trousers</div></Link>
              </div>

              <div className="gender-navbar-part">
                <Link to="/products/accesories/women/all"><h3>Women&apos;s Accesories</h3></Link>
                <Link to="/products/accesories/women/t-shirts"><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/accesories/women/hoodies"><div className="small-item">Hoodies</div></Link>
                <Link to="/products/accesories/women/sweatshirts"><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/accesories/women/trousers"><div className="small-item">Trousers</div></Link>
              </div>
            </div>
            } */}

          </div>
        </div>

        <div className="header">
          <a href="/" className="link-no-underline">
            <div className="logo"></div>
          </a>
          {/* <ul className="dynamic-txts">
            <li><span>bring</span></li>
            <li><span>hippies</span></li>
            <li><span>back</span></li>
          </ul> */}
        </div>
        
        <div className="main-menu-wrapper">
          <Link to="#" className='button ctrl' tabIndex='1'>
            {this.state.mainButton &&
              <div className="menu-button-text">{this.state.mainButton}</div>
            }
            {!this.state.mainButton &&
              <div className="main-menu-button">
                <i id="ctrl-button" className="fas fa-plus"></i>
              </div>
            }
          </Link>
          <ul id="main-menu-ul" className='tip ctrl'>

            <li className='slice'>
              <Link to="/contact">
                <div onMouseEnter={() => {
                  this.changeMainButton("Contact us")
                }}
                onMouseLeave={this.mainButtonBack}><i className="fas fa-envelope-open-text"></i>
                </div>
              </Link>
            </li>

            <li className='slice'>
              <Link to="/products/accesories/uni/all">
                <div onMouseEnter={() => {
                  this.changeMainButton("accessories")
                }}
                onMouseLeave={this.mainButtonBack}><i className="fas fa-hat-cowboy"></i>
                </div>
              </Link>
            </li>

            <li className='slice'>
              <Link to="/products">
                <div onMouseEnter={() => {
                  this.changeMainButton("products")
                }}
                onMouseLeave={this.mainButtonBack}><i className="fas fa-tshirt"></i>
                </div>
              </Link>
            </li>

            <li className='slice'>
              <Link to="/about">
                <div onMouseEnter={() => {
                  this.changeMainButton("About Us")
                }}
                onMouseLeave={this.mainButtonBack} ><i className="fab fa-angellist"></i>
                </div>
              </Link>
            </li>

            {isAuthenticated() &&
              <li className='slice'>
                <Link to="/profile"><div onMouseEnter={() => {
                  this.changeMainButton("My Account")
                }}
                onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i>
                </div>
                </Link>
              </li>
            }
            
            {!isAuthenticated() &&
              <li className='slice'>
                <Link to="/entering">
                  <div onMouseEnter={() => {
                    this.changeMainButton("Register")
                  }}
                  onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i>
                  </div>
                </Link>
              </li>
            }
          </ul>
        </div>
      </header>
    )
  }
}
export default Navbar