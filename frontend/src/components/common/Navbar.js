import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getPortfolio, getAllUsers, turnOffNotifications } from '../../lib/api'

class Navbar extends React.Component {
  state = {
    some: null,
    hideBasket: true,
    mainButton: ""
  }

  changeMainButton = (hoveredItem) => { 
    this.setState({mainButton: hoveredItem})
  }

  mainButtonBack = ()=> {
    this.setState({mainButton: ""})
  }

  render() {
    return (
      <header className="navbar">
        {/* <div className="logo">
          P<span className="hidden-vowels">ea</span>c<span className="hidden-vowels">e</span>f<span className="hidden-vowels">u</span>ll
          <span className="hidden-vowels">y</span>
        </div> */}
        <div className="header">
          <a className="link-no-underline" href="/">
            <div className="static-txt">Peacefully <span>&#174;</span> </div>
          </a>
          <ul className="dynamic-txts">
            <li><span>bring</span></li>
            <li><span>hippies</span></li>
            <li><span>back</span></li>
          </ul>
        </div>

        {window.location.pathname !== "/" && window.location.pathname !== "/entering" &&
        <>
          <div className="basket-wrapper">
            <img src="/images/basket.png" />
            <div className="basket-number">2</div>
          </div>

          <div className="main-menu-wrapper">
            <a className='button ctrl' href='#' tabIndex='1'>
              {this.state.mainButton && 
                <div className="menu-button-text">{this.state.mainButton}</div>
              }
              {!this.state.mainButton &&
                <i id="ctrl-button" className="fas fa-plus-circle"></i>
              }
            </a>
            <ul className='tip ctrl'>
              {isAuthenticated() &&
                <li className='slice'><a href="/profile"><div onMouseEnter={() => {
                  this.changeMainButton("My Account")
                }} 
                onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i></div></a></li>
              }
              {!isAuthenticated() &&
                <li className='slice'><a href="/entering"><div onMouseEnter={() => {
                  this.changeMainButton("Register")
                }} 
                onMouseLeave={this.mainButtonBack}><i className="fas fa-user"></i></div></a></li>
              }
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

              <li className='slice'><div onMouseEnter={() => {
                this.changeMainButton("About us")
              }} 
              onMouseLeave={this.mainButtonBack}>☀</div></li>
            </ul>
          </div>
        </>
        }
      </header>
    )
  }
}
export default Navbar