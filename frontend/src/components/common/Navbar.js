import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'


class Navbar extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: ""
  }

  changeMainButton = (hoveredItem) => {
    this.setState({ mainButton: hoveredItem })
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  render() {
    return (
      <header className="navbar">
        <div className="header">
          <a href="/" className="link-no-underline">
            <div className="static-txt">Peacefully <span>&#174;</span> </div>
          </a>
          <ul className="dynamic-txts">
            <li><span>bring</span></li>
            <li><span>hippies</span></li>
            <li><span>back</span></li>
          </ul>
        </div>

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
            <li className='slice'><div onMouseEnter={() => {
              this.changeMainButton("About us")
            }}
            onMouseLeave={this.mainButtonBack}>☀</div></li>
            <li className='slice'><div onMouseEnter={() => {
              this.changeMainButton("slice")
            }}
            onMouseLeave={this.mainButtonBack} >✿</div></li>

            <li className='slice'><Link to="/products"><div onMouseEnter={() => {
              this.changeMainButton("products")
            }}
            onMouseLeave={this.mainButtonBack}><i className="fas fa-tshirt"></i></div></Link></li>

            <li className='slice'><div onMouseEnter={() => {
              this.changeMainButton("accessories")
            }}
            onMouseLeave={this.mainButtonBack}><i className="fab fa-redhat"></i></div></li>

            {isAuthenticated() &&
              <li className='slice'><Link to="/profile"><div onMouseEnter={() => {
                this.changeMainButton("My Account")
              }}
              onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i></div></Link></li>
            }
            {!isAuthenticated() &&
              <li className='slice'><Link to="/entering"><div onMouseEnter={() => {
                this.changeMainButton("Register")
              }}
              onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i></div></Link></li>
            }
          </ul>
        </div>
      </header>
    )
  }
}
export default Navbar