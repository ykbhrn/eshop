import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class SecondHandNavbar extends React.Component {
  state = {
    mainButton: "",
    text: ''
  }

  revealText = (option) => {
    this.setState({ text: option })
  }

  changeMainButton = (hoveredItem) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      this.setState({ mainButton: hoveredItem })
    }
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  render() {
    return (
      <div className="second-hand-navbar">

        <a href="/" className="link-no-underline" alt="Home Page">
          <div className="menu" onMouseLeave={() => {
            this.revealText("")
          }}>

            <div className="logo label"></div>

            <div className="spacer"></div>
            <Link to="/second-hand" className="item one" onMouseEnter={() => {
              this.revealText("Second Hand Market")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>
            <Link to="/products" className="item two" onMouseEnter={() => {
              this.revealText("Our Shop")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>
            <Link to="/forum" className="item three" onMouseEnter={() => {
              this.revealText("Forum")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>

            {/* {this.state.text &&
              <div className="item logo-menu-text">{this.state.text}</div>
            } */}
            
          </div>
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