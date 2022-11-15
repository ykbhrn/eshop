import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PhoneDotsMenu from './PhoneDotsMenu'
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
    isHoveringDonation: false,
    isPhone: false
  }

  async componentDidMount() {
    const phone = window.matchMedia("(pointer: coarse)").matches

    this.setState({isPhone: phone})
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
    const dot = document.querySelectorAll(".label-dots")

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
    const isPhone = window.matchMedia("(pointer: coarse)").matches

    this.setState( {isHoveringDonation: true})

    if (isPhone) {
      this.setState({isHoveringDonation: false})
    }

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
          <div className="products-navbar">

            <div className="products-navbar-icon" onClick={this.productsMenuShow} >
            </div>

            {(!this.state.isPhone && window.innerWidth >= 800) &&
            <div className="hover-products-menu">

              {/* Products navbar */}
              {/* Accesories */}              
              <nav>
                <input className="toggle" id="nav" type="checkbox" onClick={() => {
                  this.openDotsMenu(0)
                }} />
                <label className="label-dots" htmlFor="nav"
                  onMouseEnter={() => {
                    this.showText(0)
                  }}
                  onMouseLeave={() => {
                    this.showText(false)
                  }}
                >
                  {this.state.dotMenuText === 0 &&
                <div className="hum-img text">
                Accessories
                </div>
                  }

                  {this.state.dotMenuText !== 0 &&
                <img className="hum-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1644800799/Nu%20Hippies/icons/backpack_siqllu.png" />
                  }
              
                  <ul className="list">
                    <li className="list__home"><a href="/products/accessories/bags/all/all" title="Bags">Bags</a>
                      <ul className="list__homeItems">
                        <li><a href="/products/accessories/bags/hemp bags/all" title="Hemp Bags">Hemp Bags</a></li>
                        <li><a href="/products/accessories/bags/ethnic bags/all" title="Ethnic Bags">Ethnic Bags</a></li>
                        <li><a href="/products/accessories/bags/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__clients"><a href="/products/accessories/Home and Garden/all/all" title="Home and Garden">Home and Garden</a>
                      <ul className="list__clientsItems">
                        <li><a href="/products/accessories/Home and Garden/statuettes/all" title="Statuettes">Statuettes</a></li>
                        <li><a href="/products/accessories/Home and Garden/wall hangings/all" title="Wall Hangings">Wall Hangings</a></li>
                        <li><a href="/products/accessories/Home and Garden/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__strauss"><a href="/products/accessories/jewellery/all/all" title="Jewellery">Jewellery</a>
                      <ul className="list__straussItem">
                        <li><a href="/products/accessories/jewellery/bracelets/all" title="Bracelets">Bracelets</a></li>
                        <li><a href="/products/accessories/jewellery/earrings/all" title="Earrings">Earrings</a></li>
                        <li><a href="/products/accessories/jewellery/all/all">All</a></li>
                      </ul>
                    </li>
                    <li className="list__contact"><a href="/products/accessories/others/all/all">Others</a>
                      <ul className="list__contactItem">
                        <li><a href="/products/accessories/others/cosmetics/all" title="Cosmetics">Cosmetics</a></li>
                        <li><a href="/products/accessories/others/incense/all" title="Icense">Incense</a></li>
                        <li><a href="/products/accessories/others/all/all">All</a></li>
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
              <label className="label-dots" htmlFor="nav-two" 
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
                  <li className="list__home"><a href="/products/supplements/immunity/all/all" title="Immunity">Immunity</a>
                    <ul className="list__homeItems">
                      <li><a href="/products/supplements/immunity/superfoods/all" title="Superfoods">Superfoods</a></li>
                      <li><a href="/products/supplements/immunity/vitamins and minerals/all" title="VItamins and Minerals">Vitamins &#38; Minerals</a></li>
                      <li><a href="/products/supplements/immunity/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__clients"><a href="/products/supplements/digestion/all/all" title="Digestion">Digestion</a>
                    <ul className="list__clientsItems">
                      <li><a href="/products/supplements/digestion/probiotics/all" title="Probiotics">Probiotics</a></li>
                      <li><a href="/products/supplements/digestion/enzymes/all" title="Digestive Enzymes">Enzymes</a></li>
                      <li><a href="/products/supplements/digestion/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__strauss"><a href="/products/supplements/vegan/all/all" title="Vegan Products">Vegan</a>
                    <ul className="list__straussItem">
                      <li><a href="/products/supplements/vegan/proteins/all" title="Proteins">Proteins</a></li>
                      <li><a href="/products/supplements/vegan/vitamins and minerals/all" title="Vitamins and Minerals">Vitamins &#38; Minerals</a></li>
                      <li><a href="/products/supplements/vegan/all/all">All</a></li>
                    </ul>
                  </li>

                  <li className="list__contact"><a href="/products/supplements/others/all/all">Others</a>
                    <ul className="list__contactItem">
                      <li><a href="/products/supplements/others/antioxidants/all" title="Antioxidants">Antioxidants</a></li>
                      <li><a href="/products/supplements/others/omega oils/all" title="Omega Oils">Omega Oils</a></li>
                      <li><a href="/products/supplements/others/all/all">All</a></li>
                    </ul>
                  </li>

                </ul>
              </label>
              </nav>

            </div>
            }

            {(this.state.isPhone || window.innerWidth < 800) &&  
              <PhoneDotsMenu />
            }

          </div>

          {(!this.state.isPhone && window.innerWidth >= 800) &&
            <div className="header">
              <a href="/" className="link-no-underline" alt="Home Page">
                <div className="menu">
                  <div className="logo label"></div>
                  <div className="spacer"></div>
                  <Link to="/products" className="item one"></Link>
                  <Link to="/second-hand" className="item two"></Link>
                  <Link to="/forum" className="item three"></Link>
                </div>
              </a>
            </div>
          }

          {(this.state.isPhone || window.innerWidth < 800) &&  
            <div className="header">
              <div className="menu">
                <div className="logo label"></div>
                <div className="spacer"></div>
                <Link to="/products" className="item one"></Link>
                <Link to="/second-hand" className="item two"></Link>
                <Link to="/forum" className="item three"></Link>
                <Link to="/" className="item four"></Link>
              </div>
            </div>
          }
        </div>
      
        {/* <Link to="/discount" title="Slap Putin and get discount">
          <div className="donation-icon" onMouseEnter={this.hoverDonation} onMouseLeave={this.leaveDonation}>
            {this.state.isHoveringDonation &&
            <div className="donation-text"> Slapsgiving</div>
            }
          </div>
        </Link> */}
      
      </header>
    )
  }
}
export default Navbar