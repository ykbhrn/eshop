
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'

class PhoneHome extends React.Component {
  state = {
    text: null,
    clickable: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Nu Hippies Movement",
        metaDescription: {mainMetaDescription}
      });

    } catch (err) {
      console.log(err)
    }
  }

  revealText = (option) => {
    this.setState({ text: option })
  }

  handleMenu = (event) => {
    const menuItemsText = document.querySelectorAll(".home-page-phone .hidden-text")
    const backgroundImage = document.querySelector(".home-background-phone")

    if (event.target.classList.contains("explainer") || event.target.classList.contains("all")) {
      menuItemsText.forEach(item => {
        item.style.visibility = "visible"
      })

      backgroundImage.style.opacity = "0"

      setTimeout(() => {
        this.setState({clickable: true})
      }, 300);

    } else {

      backgroundImage.style.opacity = "1"

      menuItemsText.forEach(item => {
        item.style.visibility = "hidden"
      })

      if (!event.target.classList.contains("home-menu-item")){
        this.setState({clickable: false})
      } else {
       
        setTimeout(() => {
          this.setState({clickable: false})
        }, 300);
      }

    }
   
  }

  render() {
    return (
      <>
        <div className="home-page-phone" onTouchEnd={this.handleMenu}>
          <style>
            {'\
          .basket-icon-wrapper{\
            display: none;\
          }\
          .navbar{\
            display: none;\
          }\
          .main-menu-wrapper{\
            display: none;\
          }\
          .phone-menu-wrapper{\
            display: none;\
          }\
          '}
          </style>

          <div className="home-title-wrapper"><h1>Nu Hippies Movement</h1>
            <div className="header">
              <ul className="dynamic-txts">
                <li><span>bring</span></li>
                <li><span>hippies</span></li>
                <li><span>back</span></li>
              </ul>
            </div>
          </div>

          <img className='home-background-phone'  src="https://res.cloudinary.com/nuhippies/image/upload/v1668055021/Nu%20Hippies/Backgrounds/astro_cef7ak.png"/>

          <div className="all" onMouseEnter={this.handleEye}>

            <a href={this.state.clickable ? "/forum" : "javascript:void(0)"} className="left home-menu-item">
              <div className="hidden-text">Forum</div>
            </a>

            <div className="explainer"></div>

            <a href={this.state.clickable ? "/second-hand" : "javascript:void(0)"} className="center home-menu-item">
              <div className="hidden-text">Second Hand Market</div>
            </a>

            <a href={this.state.clickable ? "/products" : "javascript:void(0)"} className="right home-menu-item">
              <div className="hidden-text">Our Shop</div>
            </a>
          
          </div>

        </div>
      </>
    );
  }
}


export default PhoneHome;
