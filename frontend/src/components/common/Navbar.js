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
    dotMenuText: false,
    isHoveringDonation: false
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

  hoverDonation = () => {
    this.setState( {isHoveringDonation: true})
  }

  leaveDonation = () => {
    this.setState( {isHoveringDonation: false})
  }

  render() {
    return (
      <header className="navbar">
        <div className="navbar-part">
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
              {/* Accesories */}              
              <nav>
                <input className="toggle" id="nav" type="checkbox" onClick={() => {
                  this.openDotsMenu(0)
                }} />
                <label className="label" htmlFor="nav"
                  onMouseEnter={() => {
                    this.showText(0)
                  }}
                  onMouseLeave={() => {
                    this.showText(false)
                  }}
                >
                  {this.state.dotMenuText === 0 &&
                <div className="hum-img text">
                Accesories
                </div>
                  }

                  {this.state.dotMenuText !== 0 &&
                <img className="hum-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1644800799/Nu%20Hippies/icons/backpack_siqllu.png" />
                  }
              
                  <ul className="list">
                    <li className="list__home"><a href="/products/accesories/bags/all/all">Bags</a>
                      <ul className="list__homeItems">
                        <li><a href="/products/accesories/bags/hemp bags/all">Hemp Bags</a></li>
                        <li><a href="/products/accesories/bags/ethnic bags/all">Ethnic Bags</a></li>
                        <li><a href="/products/accesories/bags/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__clients"><a href="/products/accesories/Home and Garden/all/all">Home and Garden</a>
                      <ul className="list__clientsItems">
                        <li><a href="/products/accesories/Home and Garden/statuettes/all">Statuettes</a></li>
                        <li><a href="/products/accesories/Home and Garden/wall hangings/all">Wall Hangings</a></li>
                        <li><a href="/products/accesories/Home and Garden/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__strauss"><a href="/products/accesories/jewellery/all/all">Jewellery</a>
                      <ul className="list__straussItem">
                        <li><a href="/products/accesories/jewellery/bracelets/all">Bracelets</a></li>
                        <li><a href="/products/accesories/jewellery/earrings/all">Earrings</a></li>
                        <li><a href="/products/accesories/jewellery/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__contact"><a href="/products/accesories/others/all/all">Others</a>
                      <ul className="list__contactItem">
                        <li><a href="/products/accesories/others/cosmetics/all">Cosmetics</a></li>
                        <li><a href="/products/accesories/others/incense/all">Incense</a></li>
                        <li><a href="/products/accesories/others/all/all">All</a></li>
                      </ul>
                    </li>
                  </ul>
                </label>
              </nav>

              <div className="products-menu-close" onClick={this.productsMenuShow}>
                <img src="https://res.cloudinary.com/nuhippies/image/upload/v1644809706/Nu%20Hippies/icons/error_rvhkbf.png" />
              </div>

              {/* Supplements */}

              <nav><input className="toggle" id="nav-two" type="checkbox" onClick={() => {
                this.openDotsMenu(1)
              }}/>
              <label className="label" htmlFor="nav-two" 
                onMouseEnter={() => {
                  this.showText(1)
                }}
                onMouseLeave={() => {
                  this.showText(false)
                }}
              >
                {this.state.dotMenuText === 1 &&
                <div className="hum-img text">
                Supplements
                </div>
                }

                {this.state.dotMenuText !== 1 &&
                <img className="hum-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1647920540/Nu%20Hippies/icons/vitamin_wynbxw.png" />
                }
                <ul className="list">
                  <li className="list__home"><a href="/products/supplements/immunity/all/all">Immunity</a>
                    <ul className="list__homeItems">
                      <li><a href="/products/supplements/immunity/superfoods/all">Superfoods</a></li>
                      <li><a href="/products/supplements/immunity/vitamins and minerals/all">Vitamins &#38; Minerals</a></li>
                      <li><a href="/products/supplements/immunity/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__clients"><a href="/products/supplements/digestion/all/all">Digestion</a>
                    <ul className="list__clientsItems">
                      <li><a href="/products/supplements/digestion/probiotics/all">Probiotics</a></li>
                      <li><a href="/products/supplements/digestion/enzymes/all">Enzymes</a></li>
                      <li><a href="/products/supplements/digestion/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__strauss"><a href="/products/supplements/vegan/all/all">Vegan</a>
                    <ul className="list__straussItem">
                      <li><a href="/products/supplements/vegan/proteins/all">Proteins</a></li>
                      <li><a href="/products/supplements/vegan/vitamins and minerals/all">Vitamins &#38; Minerals</a></li>
                      <li><a href="/products/supplements/vegan/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__contact"><a href="/products/supplements/others/all/all">Others</a>
                    <ul className="list__contactItem">
                      <li><a href="/products/supplements/others/antioxidants/all">Antioxidants</a></li>
                      <li><a href="/products/supplements/others/omega oils/all">Omega Oils</a></li>
                      <li><a href="/products/supplements/others/all/all">All</a></li>
                    </ul>
                  </li>

                </ul>
              </label>
              </nav>

            </div>
          </div>

          <div className="header">
            <a href="/" className="link-no-underline">
              <div className="logo"></div>
            </a>
            {/* Beta Version */}
            {/* <h3>This is Beta version of the website, WE ARE STARTING SOON</h3> */}
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
                <Link to="/products/accesories/all/all/all">
                  <div onMouseEnter={() => {
                    this.changeMainButton("Accessories")
                  }}
                  onMouseLeave={this.mainButtonBack}><i className="fa-solid fa-bag-shopping"></i>
                  </div>
                </Link>
              </li>

              <li className='slice'>
                <Link to="/products/supplements/all/all/all">
                  <div onMouseEnter={() => {
                    this.changeMainButton("Supplements")
                  }}
                  onMouseLeave={this.mainButtonBack}><i className="fa-solid fa-jar"></i>
                  </div>
                </Link>
              </li>

              <li className='slice'>
                <Link to="/products">
                  <div onMouseEnter={() => {
                    this.changeMainButton("All Products")
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
        </div>

        <Link to="/donation">
          <div className="donation-icon" onMouseEnter={this.hoverDonation} onMouseLeave={this.leaveDonation}>
            {this.state.isHoveringDonation &&
            <div className="donation-text"> Slap &#38; Donate</div>
            }
          </div>
        </Link>
        {/* <div className="navbar-bottom"></div>
        <div className="navbar-bottom-second"></div> */}
      </header>
    )
  }
}
export default Navbar