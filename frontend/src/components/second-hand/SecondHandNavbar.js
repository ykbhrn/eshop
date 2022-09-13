import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class SecondHandNavbar extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: "",
    isClothing: null,
    showProductsNavbar: false,
    dotMenuText: false,
    isHoveringDonation: false
  }

  render() {
    return (
      <div className="second-hand-navbar">

        <a href="/" className="link-no-underline" alt="Home Page">
          <div className="logo"></div>
        </a>

        {/* <img className="search-icon-navbar" src="https://res.cloudinary.com/nuhippies/image/upload/v1656644808/Nu%20Hippies/icons/magnifying-glass_txpekd.png"/> */}

        {/* <form className="navbar-search">
          <input 
            type="search" 
            id=""
            name="search"
            placeholder="search" 
          />
        </form> */}
    
      </div>
    )
  }
}
export default SecondHandNavbar