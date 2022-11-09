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

  pointerEventsOn = () => {
    const mainMenuOl = document.querySelector(".main-menu-ol")
    const mainMenuIcon = document.querySelector(".main-menu-icon")
    const items = document.querySelectorAll(".phone-menu-wrapper .item")

    var  temp = window.getComputedStyle(items[0]).getPropertyValue("opacity");

    if (temp == 0) {

      items.forEach(item => {
        item.style.left = "0px"
        item.style.opacity = "1"
      })
  
      mainMenuIcon.style.transform = "rotate(-90deg)"
      mainMenuIcon.style.backgroundColor = "rgb(220, 253, 255)"
      mainMenuIcon.style.boxShadow = "0 0 10px 2px #52C1C7"
      mainMenuOl.style.background = "#f3f5fd"

    } else {

      items.forEach(item => {
        item.style.left = "-540px"
        item.style.opacity = "0"
      })

      mainMenuIcon.style.transform = "rotate(0deg)"
      mainMenuIcon.style.backgroundColor = "transparent"
      mainMenuIcon.style.boxShadow = "none"
  
      mainMenuOl.style.background = "none"
    }

  }

  render() {
    return (
      <div className="phone-menu-wrapper">

        <div className="main-menu">

          <nav>
            <ol className='main-menu-ol'>

              <li className="menu-item item one">
                <div className='emoji-icon'><span>Home</span></div>
                <ol className="sub-menu">
                  <li className="menu-item"><Link to="/second-hand">Second Hand Market</Link></li>
                  <li className="menu-item"><Link to="/products">Our Shop</Link></li>
                  <li className="menu-item"><Link to="/forum">Forum</Link></li>
                  <li className="menu-item"><Link to="/">Homepage</Link></li>
                </ol>
              </li>

              <li className="menu-item item two">
                <Link to="/discount">Slaps- <br/>giving</Link>
              </li>

              <li className="menu-item item three">
                {isAuthenticated() &&
                  <Link to="/second-hand/post-item">Post Ad</Link>
                }
          
                {!isAuthenticated() &&
                  <Link to="/entering">Post Ad</Link>
                }
              </li>

              <li className="menu-item item four">
                {isAuthenticated() &&
                  <Link to="/chats">Chat</Link>
                }
          
                {!isAuthenticated() &&
                  <Link to="/entering">Chat</Link>
                }
              </li>

              <li className="menu-item item five">
                {isAuthenticated() &&
                <>
                  <div className='emoji-icon'><span>Account</span></div>
                  <ol className="sub-menu">
                    <li className="menu-item"><Link to="/profile/orders">Your Orders</Link></li>
                    <li className="menu-item"><Link to="/profile/ads">Your Ads</Link></li>
                    <li className="menu-item"><Link to="/profile">Account Page</Link></li>
                  </ol>
                </>
                }
                {!isAuthenticated() &&
                <>
                  <div className='emoji-icon'><span>Profile</span></div>
                  <ol className="sub-menu">
                    <li className="menu-item"><Link to="/entering">Your Orders</Link></li>
                    <li className="menu-item"><Link to="/entering">Your Ads</Link></li>
                    <li className="menu-item"><Link to="/entering">Account Page</Link></li>
                  </ol>
                </>
                }
              </li>
              
            </ol>
          </nav>

          <div className='main-menu-icon label' onTouchStart={this.pointerEventsOn}></div>

        </div>

      </div>
    )
  }
}
export default PhoneMainMenu
