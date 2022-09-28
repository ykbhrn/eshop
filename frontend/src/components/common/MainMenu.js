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
          {!this.state.mainButton &&
              <div className="main-menu-button">
                <i id="ctrl-button" className="fas fa-plus"></i>
              </div>
          }
        </Link>
        <ul id="main-menu-ul" className='tip ctrl'>
              
          <li className='slice'>
            <Link to="/about" title="What is Nu Hippies?">
              <div onMouseEnter={() => {
                this.changeMainButton("About Us")
              }}
              onMouseLeave={this.mainButtonBack} ><i className="fa-solid fa-hand-peace"></i>
              </div>
            </Link>
          </li>

          <li className='slice'>
            <Link to="/discount" title="Rules of Slapsgiving game">
              <div onMouseEnter={() => {
                this.changeMainButton("Slapsgiving")
              }}
              onMouseLeave={this.mainButtonBack}><i className="fa-solid fa-hands"></i>
              </div>
            </Link>
          </li>

          <li className='slice'>
            <Link to="/" title="Homepage">
              <div onMouseEnter={() => {
                this.changeMainButton("Home")
              }}
              onMouseLeave={this.mainButtonBack}><i className="fa-solid fa-house"></i>
              </div>
            </Link>
          </li>

          <li className='slice'>
            <Link to="/chats" title="Messages">
              <div onMouseEnter={() => {
                this.changeMainButton("Chat")
              }}
              onMouseLeave={this.mainButtonBack}><i className="fa-solid fa-comments"></i>
              </div>
            </Link>
          </li>

          {isAuthenticated() &&
              <li className='slice'>
                <Link to="/profile" title="Your Profile"><div onMouseEnter={() => {
                  this.changeMainButton("My Account")
                }}
                onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i>
                </div>
                </Link>
              </li>
          }
            
          {!isAuthenticated() &&
              <li className='slice'>
                <Link to="/entering" title="Sign in">
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
    )
  }
}
export default MainMenu
