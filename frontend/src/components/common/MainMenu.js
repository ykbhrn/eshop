import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class MainMenu extends React.Component {
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

  render() {
    return (
      <div className="main-menu-wrapper">
        <Link to="#" className='button ctrl' tabIndex='1'>
          {this.state.mainButton &&
              <div className="menu-button-text">{this.state.mainButton}</div>
          }
          <div className="main-menu-button">
            <i id="ctrl-button" className="fa-solid fa-xmark"></i>
          </div>
        </Link>

        <div className='main-menu-rotate'>
          <ul id="main-menu-ul" className='tip ctrl'>

            <li className='slice'>
              <div onMouseEnter={() => {
                this.changeMainButton("Slapsgiving")
              }}
              onMouseLeave={this.mainButtonBack}>
                <Link to="/discount" title="Rules of Slapsgiving game">
                  <span>
                    <i className="fa-solid fa-hands"></i>
                  </span>
                </Link>
              </div>
            </li>

            <li className='slice'>
              <div onMouseEnter={() => {
                this.changeMainButton("About Us")
              }}
              onMouseLeave={this.mainButtonBack} >
                <Link to="/about" title="What is Nu Hippies?">   
                  <span>
                    <i className="fa-solid fa-hand-peace"></i>
                  </span>
                </Link>
              </div>
            </li>

            <li className='slice'>
              <div onMouseEnter={() => {
                this.changeMainButton("Home")
              }}
              onMouseLeave={this.mainButtonBack}>
                <Link to="/" title="Homepage">
                  <span>
                    <i className="fa-solid fa-house"></i>
                  </span>
                </Link>
              </div>
            </li>

            <li className='slice'>
              <div onMouseEnter={() => {
                this.changeMainButton("Chat")
              }}
              onMouseLeave={this.mainButtonBack}>
                <Link to="/chats" title="Messages">
                  <span>
                    <i className="fa-solid fa-comments"></i>
                  </span>
                </Link>
              </div>
            </li>

            {isAuthenticated() &&
              <li className='slice'>
                <div onMouseEnter={() => {
                  this.changeMainButton("My Account")
                }}
                onMouseLeave={this.mainButtonBack}>
                  <Link to="/profile" title="Your Profile">
                    <span>
                      <i className="fas fa-user"></i>
                    </span>
                  </Link>

                </div>
              </li>
            }
            
            {!isAuthenticated() &&
              <li className='slice'>
                <div onMouseEnter={() => {
                  this.changeMainButton("Register")
                }}
                onMouseLeave={this.mainButtonBack}>
                  <Link to="/entering" title="Sign in">
                    <span>
                      <i className="fas fa-user"></i>
                    </span>
                  </Link>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default MainMenu
