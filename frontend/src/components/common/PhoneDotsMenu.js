import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class PhoneDotsMenu extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: "",
    isClothing: null,
    showProductsNavbar: false,
    dotMenuText: false,
    isHoveringDonation: false,
    isPhone: false,
    clickable: ""
  }

  async componentDidMount() {
    const phone = window.matchMedia("(pointer: coarse)").matches

    this.setState({isPhone: phone})
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

  isActive = (option) => {

    setTimeout(() => {
      this.setState({clickable: option})
    }, 200);
  }

  render() {
    return (
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
            onTouchStart={() =>{
              this.isActive("")
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
              <li className="list__home">

                <a href={this.state.clickable === "bags" ? "/products/accessories/bags/all/all" : "javascript:void(0)"} title="Bags" onTouchEnd={() =>{
                  this.isActive("bags")
                }}>
                  Bags
                </a>
                
                <ul className="list__homeItems">
                  <li><a href="/products/accessories/bags/hemp bags/all" title="Hemp Bags">Hemp Bags</a></li>
                  <li><a href="/products/accessories/bags/ethnic bags/all" title="Ethnic Bags">Ethnic Bags</a></li>
                  <li><a href="/products/accessories/bags/all/all">All</a></li>
                </ul>
              </li>

              <li className="list__clients">

                <a href={this.state.clickable === "home and garden" ? "/products/accessories/Home and Garden/all/all" : "javascript:void(0)"} title="Home and Garden" onTouchStart={() =>{
                  this.isActive("home and garden")
                }}>
                  Home and Garden
                </a>

                <ul className="list__clientsItems">
                  <li><a href="/products/accessories/Home and Garden/statuettes/all" title="Statuettes">Statuettes</a></li>
                  <li><a href="/products/accessories/Home and Garden/wall hangings/all" title="Wall Hangings">Wall Hangings</a></li>
                  <li><a href="/products/accessories/Home and Garden/all/all">All</a></li>
                </ul>
              </li>

              <li className="list__strauss">

                <a href={this.state.clickable === "jewellery" ? "/products/accessories/jewellery/all/all" : "javascript:void(0)"} title="Jewellery" onTouchStart={() =>{
                  this.isActive("jewellery")
                }}>
                  Jewellery
                </a>

                <ul className="list__straussItem">
                  <li><a href="/products/accessories/jewellery/bracelets/all" title="Bracelets">Bracelets</a></li>
                  <li><a href="/products/accessories/jewellery/earrings/all" title="Earrings">Earrings</a></li>
                  <li><a href="/products/accessories/jewellery/all/all">All</a></li>
                </ul>
              </li>

              <li className="list__contact">
                
                <a href={this.state.clickable === "others" ? "/products/accessories/others/all/all" : "javascript:void(0)"} title="Others" onTouchStart={() =>{
                  this.isActive("others")
                }}>
                  Others
                </a>

                <ul className="list__contactItem">
                  <li><a href="/products/accessories/others/cosmetics/all" title="Cosmetics">Cosmetics</a></li>
                  <li><a href="/products/accessories/others/incense/all" title="Icense">Incense</a></li>
                  <li><a href="/products/accessories/others/all/all">All</a></li>
                </ul>
              </li>
            </ul>
          </label>
        </nav>

        <div className="products-menu-close" onClick={this.productsMenuShow} onTouchStart={() =>{
          this.isActive("")
        }}>
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
          onTouchStart={() =>{
            this.isActive("")
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

            <li className="list__home">

              <a href={this.state.clickable === "immunity" ? "/products/supplements/immunity/all/all" : "javascript:void(0)"} title="Immunity" onTouchStart={() =>{
                this.isActive("immunity")
              }}>
                Immunity
              </a>
                
              <ul className="list__homeItems">
                <li><a href="/products/supplements/immunity/superfoods/all" title="Superfoods">Superfoods</a></li>
                <li><a href="/products/supplements/immunity/vitamins and minerals/all" title="VItamins and Minerals">Vitamins &#38; Minerals</a></li>
                <li><a href="/products/supplements/immunity/all/all">All</a></li>
              </ul>
            </li>

            <li className="list__clients">

              <a href={this.state.clickable === "digestion" ? "/products/supplements/digestion/all/all" : "javascript:void(0)"} title="Digestion" onTouchStart={() =>{
                this.isActive("digestion")
              }}>
                Digestion
              </a>
              
              <ul className="list__clientsItems">
                <li><a href="/products/supplements/digestion/probiotics/all" title="Probiotics">Probiotics</a></li>
                <li><a href="/products/supplements/digestion/enzymes/all" title="Digestive Enzymes">Enzymes</a></li>
                <li><a href="/products/supplements/digestion/all/all">All</a></li>
              </ul>
            </li>

            <li className="list__strauss">

              <a href={this.state.clickable === "vegan" ? "/products/supplements/vegan/all/all" : "javascript:void(0)"} title="Vegan" onTouchStart={() =>{
                this.isActive("vegan")
              }}>
                Vegan
              </a>

              <ul className="list__straussItem">
                <li><a href="/products/supplements/vegan/proteins/all" title="Proteins">Proteins</a></li>
                <li><a href="/products/supplements/vegan/vitamins and minerals/all" title="Vitamins and Minerals">Vitamins &#38; Minerals</a></li>
                <li><a href="/products/supplements/vegan/all/all">All</a></li>
              </ul>
            </li>

            <li className="list__contact">

              <a href={this.state.clickable === "others" ? "/products/supplements/others/all/all" : "javascript:void(0)"} title="Others" onTouchStart={() =>{
                this.isActive("others")
              }}>
                Others
              </a>

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
    )
  }
}
export default PhoneDotsMenu