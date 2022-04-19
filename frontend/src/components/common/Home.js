import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';

class Home extends React.Component {
  state = {
    images: [],
    mainButton: ""
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      const close = document.querySelector('.close')
      const leftBanner = document.querySelector('.home-left-banner')
      const rightBanner = document.querySelector('.home-right-banner')
      const bannerImg = document.querySelector('.home-left-banner img')
      const homeMenu = document.querySelector('.home-menu ul')

      var ua = window.navigator.userAgent;
      var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      var webkit = !!ua.match(/WebKit/i);
      var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

      const isSafari = window.safari !== undefined
      const isPhone = window.matchMedia("(pointer: coarse)").matches

      if (isPhone) {
        homeMenu.style.animation = "spring 3s infinite"
      }

      if (isSafari || iOSSafari) {
        close.style.animation = "none"
      }

      let bannerPosition = 1
      
      const bannerInterval = setInterval(() => {

        if (bannerPosition === 1) {
          leftBanner.style.clipPath = "polygon(100% 0, 0 0, 100% 100%)"
          leftBanner.style.webkitClipPath = "polygon(100% 0, 0 0, 100% 100%)"
          leftBanner.style.left = "calc(100% - 400px)"
          leftBanner.style.top = "0px"
          bannerImg.style.objectPosition = "left"
          rightBanner.style.visibility = "hidden"
        } else if (bannerPosition === 2) {
          leftBanner.style.clipPath = "polygon(100% 0, 0% 100%, 100% 100%)"
          leftBanner.style.webkitClipPath = "polygon(100% 0, 0% 100%, 100% 100%)"
          leftBanner.style.left = "calc(100% - 400px)"
          leftBanner.style.top = "calc(100% - 400px)"
          bannerImg.style.objectPosition = "right"
        } else if (bannerPosition === 3) {
          leftBanner.style.clipPath = "polygon(100% 100%, 0 0, 0 100%)"
          leftBanner.style.webkitClipPath = "polygon(100% 100%, 0 0, 0 100%)"
          leftBanner.style.left = "0px"
          leftBanner.style.top = "calc(100% - 400px)"
          bannerImg.style.objectPosition = "right"
        } else if (bannerPosition === 4) {
          leftBanner.style.clipPath = "polygon(0 0, 0% 100%, 100% 0)"
          leftBanner.style.webkitClipPath = "polygon(0 0, 0% 100%, 100% 0)"
          leftBanner.style.left = "0px"
          leftBanner.style.top = "0px"
          bannerImg.style.objectPosition = "left"
          rightBanner.style.visibility = "visible"
        } 

        if (bannerPosition < 4) {
          bannerPosition++
        } else {
          bannerPosition = -5
        }

      }, 2000);

    } catch (err) {
      console.log(err)
    }
  }

  changeMainButton = (hoveredItem) => {
    this.setState({ mainButton: hoveredItem })
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  render() {
    return (
      <>
        <div className="home-page change-brightness" >
          <style>
            {'\
          .basket-icon-wrapper{\
            display: none;\
          }\
          .navbar{\
            display: none;\
          }\
          '}
          </style>

          <div className="home-title-wrapper"><div className="home-title">Nu Hippies Movement</div></div>
          <div className="header">
            <ul className="dynamic-txts">
              <li><span>bring</span></li>
              <li><span>hippies</span></li>
              <li><span>back</span></li>
            </ul>
          </div>

          <div className="home-left-banner">

            <img id="left-video" src="https://res.cloudinary.com/nuhippies/image/upload/v1650073667/Nu%20Hippies/Backgrounds/hippies-710_zx1kuc.jpg" />

            <img id="left-video-two" src="https://res.cloudinary.com/nuhippies/image/upload/v1650073699/Nu%20Hippies/Backgrounds/img529-1_fotg6l.jpg" />

            {/* <video id="left-video" autoPlay loop muted>
              <source id="left-video-source" src='https://res.cloudinary.com/nuhippies/video/upload/v1646181002/Nu%20Hippies/Backgrounds/mainvideo_xlkzq4.mp4' type="video/mp4" />
            </video>

            <video id="left-video-two" autoPlay loop muted>
              <source id="left-video-source" src='https://res.cloudinary.com/nuhippies/video/upload/v1645993864/Nu%20Hippies/Backgrounds/tt_1_ceeycb.mp4' type="video/mp4" />
            </video> */}

          </div>

          <div className="home-menu">
            <ul className="home-menu-ul">

              <li>
                <a href="/products" onMouseEnter={() => {
                  this.changeMainButton("All Products");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fas fa-tshirt"></i>
                </a>
              </li>

              <li>
                <a href="/products/supplements/all/all/all" onMouseEnter={() => {
                  this.changeMainButton("Supplements");
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fa-solid fa-jar"></i>
                </a>
              </li>

              <li>
                {!isAuthenticated() &&
                  <a href="/entering" onMouseEnter={() => {
                    this.changeMainButton("Register");
                  }}
                  onMouseLeave={this.mainButtonBack}>
                    <i className="fas fa-user flip"></i>
                  </a>
                }
                {isAuthenticated() &&
                  <a href="/profile" onMouseEnter={() => {
                    this.changeMainButton("My Account");
                  }}
                  onMouseLeave={this.mainButtonBack}>
                    <i className="fas fa-user flip"></i>
                  </a>
                }
              </li>

              <li>
                <a href="/about" onMouseEnter={() => {
                  this.changeMainButton("About Us")
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fab fa-angellist flip"></i>
                </a>
              </li>

              <li>
                <a href="/donation" onMouseEnter={() => {
                  this.changeMainButton("Slap & Donate")
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fa-solid fa-dove flip"></i>
                </a>
              </li>

              <li>
                <a href="/products/accessories/all/all/all" onMouseEnter={() => {
                  this.changeMainButton("Accessories")
                }}
                onMouseLeave={this.mainButtonBack}>
                  <i className="fa-solid fa-bag-shopping"></i>
                </a>
              </li>

              <li className="close">
                <a href="#">
                  {this.state.mainButton &&
                    <div className="home-menu-button-text">{this.state.mainButton}</div>
                  }
                  {!this.state.mainButton &&
                    <div><i className="fas"><div className="home-logo"></div></i></div>
                  }
                </a>
              </li>
            </ul>
          </div>

          <div className="home-right-banner">

            <img id="right-video" src="https://res.cloudinary.com/nuhippies/image/upload/v1650073667/Nu%20Hippies/Backgrounds/hippies-710_zx1kuc.jpg" />

            <img id="right-video-two" src="https://res.cloudinary.com/nuhippies/image/upload/v1650073699/Nu%20Hippies/Backgrounds/img529-1_fotg6l.jpg" />

            {/* <video id="right-video" autoPlay loop muted preload="metadata">
              <source id="right-video-source" src='https://res.cloudinary.com/nuhippies/video/upload/v1646181002/Nu%20Hippies/Backgrounds/mainvideo_xlkzq4.mp4' type="video/mp4" />
            </video>

            <video id="right-video-two" autoPlay loop muted preload="metadata">
              <source id="right-video-source" src='https://res.cloudinary.com/nuhippies/video/upload/v1645993864/Nu%20Hippies/Backgrounds/tt_1_ceeycb.mp4' type="video/mp4" />
            </video> */}

          </div>

        </div>
      </>
    );
  }
}


export default Home;