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
    showProductsNavbar: false,
    dotMenuText: false
  }

  changeMainButton = (hoveredItem) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      this.setState({ mainButton: hoveredItem })
    }
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  productsMenuShow = () => {
    const productsHoverMenu = document.querySelector(".hover-products-menu")

    if (productsHoverMenu.style.display === "flex") {
      productsHoverMenu.style.animation = "0.3s menu-out linear" 
      setTimeout(() => {
        productsHoverMenu.style.display = "none"
      }, 295);
    } else {      
      productsHoverMenu.style.display = "flex"
      productsHoverMenu.style.animation = "0.3s menu-in linear" 
    }
  }

  openDotsMenu = (item) => {
    const dot = document.querySelectorAll(".label")

    if (item === 0) {
      dot[0].style.width = dot[0].style.width === '150px' ? '330px' : '150px'
      dot[0].style.height = dot[0].style.height === '150px' ? '330px' : '150px'
    } else if (item === 1) {
      dot[1].style.width = dot[1].style.width === '150px' ? '330px' : '150px'
      dot[1].style.height = dot[1].style.height === '150px' ? '330px' : '150px'
    }

  }

  showText = (item) => {
    this.setState({dotMenuText: item})
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

          <div className="products-navbar-icon" onClick={this.productsMenuShow} >
          </div>
          
          <div className="hover-products-menu">

            {/* Products navbar */}
            {/* Clothes */}              
            <nav><input className="toggle" id="nav" type="checkbox" /><label className="label" htmlFor="nav" onClick={() => {
              this.openDotsMenu(0)
            }}
            onMouseEnter={() => {
              this.showText(0)
            }}
            onMouseLeave={() => {
              this.showText(false)
            }}
            >
              {this.state.dotMenuText === 0 &&
                <div className="hum-img text">
                Clothing
                </div>
              }

              {this.state.dotMenuText !== 0 &&
                <img className="hum-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1644693598/Nu%20Hippies/icons/tshirt_ybntiy.png" />
              }
              
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

            <div className="products-menu-close" onClick={this.productsMenuShow}>
              <img src="https://res.cloudinary.com/nuhippies/image/upload/v1644809706/Nu%20Hippies/icons/error_rvhkbf.png" />
            </div>

            {/* Accesories */}

            <nav><input className="toggle" id="nav-two" type="checkbox" /><label className="label" htmlFor="nav-two" onClick={() => {
              this.openDotsMenu(1)
            }}
            onMouseEnter={() => {
              this.showText(1)
            }}
            onMouseLeave={() => {
              this.showText(false)
            }}
            >
              {this.state.dotMenuText === 1 &&
                <div className="hum-img text">
                Accesories
                </div>
              }

              {this.state.dotMenuText !== 1 &&
                <img className="hum-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1644800799/Nu%20Hippies/icons/backpack_siqllu.png" />
              }              <span className="hum"></span>
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