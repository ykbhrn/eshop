import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'


class Navbar extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: "",
    isClothing: null
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
    const menuItems = document.querySelectorAll(".products-navbar-item")
    const productsHoverMenu = document.querySelector(".hover-products-menu")

    productsHoverMenu.style.display = "flex"
    productsHoverMenu.style.animation = "0.2s menu-in linear"
    if (item === "clothing") {
      menuItems[0].classList.add("active")
      menuItems[1].classList.remove("active")
      this.setState({isClothing: true})
    } else if (item === "accesories") {
      menuItems[1].classList.add("active")
      menuItems[0].classList.remove("active")
      this.setState({isClothing: false})
    }  
    console.log()
  }

  productsMenuLeave = () => {
    const menuItems = document.querySelectorAll(".products-navbar-item")
    const productsHoverMenu = document.querySelector(".hover-products-menu")

    productsHoverMenu.style.animation = "0.2s menu-out linear"
    menuItems[0].classList.remove("active")
    menuItems[1].classList.remove("active")
    setTimeout(() => {
      productsHoverMenu.style.display = "none"
    }, 195);
  }

  render() {
    return (
      <header className="navbar" onMouseLeave ={() => {
        this.productsMenuLeave()
      }}>
        <style>
          {'\
          .hover-products-menu{\
            display: none;\
          }\
          '}
        </style>
        <div className="products-navbar" onMouseLeave ={() => {
          this.productsMenuLeave()
        }}>
          <Link to="/products/clothing/uni/all"><div className="products-navbar-item" onMouseEnter={() => {
            this.productsMenuHover("clothing")
          }}>Clothing</div>
          </Link>
          <Link to="/products/accesories/uni/all"><div className="products-navbar-item" onMouseEnter={() => {
            this.productsMenuHover("accesories")
          }}>Accesories</div>
          </Link>
          <div className="hover-products-menu">
            {this.state.isClothing &&
            <div className="gender-navbar-part-wrapper">
              <div className="gender-navbar-part">
                <Link to="/products/clothing/men/all" onClick={this.productsMenuLeave}><h3>Men&apos;s Clothing</h3></Link>
                <Link to="/products/clothing/men/t-shirts" onClick={this.productsMenuLeave}><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/clothing/men/hoodies" onClick={this.productsMenuLeave}><div className="small-item">Hoodies</div></Link>
                <Link to="/products/clothing/men/sweatshirts" onClick={this.productsMenuLeave}><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/clothing/men/trousers" onClick={this.productsMenuLeave}><div className="small-item">Trousers</div></Link>
              </div>

              <div className="gender-navbar-part">
                <Link to="/products/clothing/women/all" onClick={this.productsMenuLeave}><h3>Women&apos;s Clothing</h3></Link>
                <Link to="/products/clothing/women/t-shirts" onClick={this.productsMenuLeave}><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/clothing/women/hoodies" onClick={this.productsMenuLeave}><div className="small-item">Hoodies</div></Link>
                <Link to="/products/clothing/women/sweatshirts" onClick={this.productsMenuLeave}><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/clothing/women/trousers" onClick={this.productsMenuLeave}><div className="small-item">Trousers</div></Link>
              </div>
            </div>
            }

            {!this.state.isClothing &&
            <div className="gender-navbar-part-wrapper">
              <div className="gender-navbar-part">
                <Link to="/products/accesories/men/all" onClick={this.productsMenuLeave}><h3>Men&apos;s Accesories</h3></Link>
                <Link to="/products/accesories/men/t-shirts" onClick={this.productsMenuLeave}><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/accesories/men/hoodies" onClick={this.productsMenuLeave}><div className="small-item">Hoodies</div></Link>
                <Link to="/products/accesories/men/sweatshirts" onClick={this.productsMenuLeave}><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/accesories/men/trousers" onClick={this.productsMenuLeave}><div className="small-item">Trousers</div></Link>
              </div>

              <div className="gender-navbar-part">
                <Link to="/products/accesories/women/all" onClick={this.productsMenuLeave}><h3>Women&apos;s Accesories</h3></Link>
                <Link to="/products/accesories/women/t-shirts" onClick={this.productsMenuLeave}><div className="small-item">T-Shirts</div></Link>
                <Link to="/products/accesories/women/hoodies" onClick={this.productsMenuLeave}><div className="small-item">Hoodies</div></Link>
                <Link to="/products/accesories/women/sweatshirts" onClick={this.productsMenuLeave}><div className="small-item">Sweatshirts</div></Link>
                <Link to="/products/accesories/women/trousers" onClick={this.productsMenuLeave}><div className="small-item">Trousers</div></Link>
              </div>
            </div>
            }

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
                  </div></Link>
              </li>
            }
          </ul>
        </div>
      </header>
    )
  }
}
export default Navbar