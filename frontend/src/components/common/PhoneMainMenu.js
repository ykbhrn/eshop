import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class PhoneMainMenu extends React.Component {
  state = {
    mainButton: ""
  }

  changeMainButton = (hoveredItem) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      this.setState({ mainButton: hoveredItem })
    }
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  pointerEventsOff = () => {
    const mainMenu = document.querySelector(".main-menu")
    const mainMenuOl = document.querySelector(".main-menu-ol")
    const subMenu = document.querySelectorAll(".sub-menu")

    mainMenu.style.pointerEvents = "none"
    mainMenuOl.style.pointerEvents = "none"

    subMenu.forEach(item => {
      item.style.pointerEvents = "none"
    })
  }

  pointerEventsOn = () => {
    const mainMenu = document.querySelector(".main-menu")
    mainMenu.style.pointerEvents = "all"
  }

  subMenuPointerEventsOn = () => {
    const subMenu = document.querySelectorAll(".sub-menu")

    subMenu.forEach(item => {
      item.style.pointerEvents = "all"
    })
  }

  render() {
    console.log("phone")
    return (
      <div className="phone-menu-wrapper">

        <div className="main-menu">

          <nav>
            <ol className='main-menu-ol'>

              <li className="menu-item item one" onClick={this.pointerEventsOff} onMouseEnter={this.subMenuPointerEventsOn}>
                <div className='emoji-icon'><span>Home</span></div>
                <ol className="sub-menu">
                  <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/second-hand">Second Hand Market</Link></li>
                  <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/products">Our Shop</Link></li>
                  <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/forum">Forum</Link></li>
                  <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/">Homepage</Link></li>
                </ol>
              </li>

              <li className="menu-item item two" onClick={this.pointerEventsOff}>
                <Link to="/discount">Slaps- <br/>giving</Link>
              </li>

              <li className="menu-item item three" onClick={this.pointerEventsOff}>
                {isAuthenticated() &&
                  <Link to="/second-hand/post-item">Post Ad</Link>
                }
          
                {!isAuthenticated() &&
                  <Link to="/entering">Post Ad</Link>
                }
              </li>

              <li className="menu-item item four" onClick={this.pointerEventsOff}>
                {isAuthenticated() &&
                  <Link to="/chats">Chat</Link>
                }
          
                {!isAuthenticated() &&
                  <Link to="/entering">Chat</Link>
                }
              </li>

              <li className="menu-item item five" onClick={this.pointerEventsOff} onMouseEnter={this.subMenuPointerEventsOn}>
                {isAuthenticated() &&
                <>
                  <div className='emoji-icon'><span>Account</span></div>
                  <ol className="sub-menu">
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/profile/orders">Your Orders</Link></li>
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/profile/ads">Your Ads</Link></li>
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/profile">Account Page</Link></li>
                  </ol>
                </>
                }
                {!isAuthenticated() &&
                <>
                  <div className='emoji-icon'><span>Profile</span></div>
                  <ol className="sub-menu">
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/entering">Your Orders</Link></li>
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/entering">Your Ads</Link></li>
                    <li className="menu-item" onClick={this.pointerEventsOff}><Link to="/entering">Account Page</Link></li>
                  </ol>
                </>
                }
              </li>
              
            </ol>
          </nav>

          {/* <div className="spacer"></div> */}

          <div className='main-menu-icon label'></div>

            
        </div>

      </div>
    )
  }
}
export default PhoneMainMenu
