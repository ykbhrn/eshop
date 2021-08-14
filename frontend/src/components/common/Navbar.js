import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getPortfolio, getAllUsers, turnOffNotifications } from '../../lib/api'

class Navbar extends React.Component {
  state = {
    some: null,
    hideBasket: true
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
              <i id="ctrl-button" className="fas fa-plus-circle"></i>
            </a>
            <ul className='tip ctrl'>
              {isAuthenticated() &&
                <li className='slice'><Link to="/profile"><div><i className="fas fa-user"></i></div></Link></li>
              }
              {!isAuthenticated() &&
                <li className='slice'><Link to="/entering"><div><i className="fas fa-user"></i></div></Link></li>
              }
              <li className='slice'><div>✿</div></li>
              <li className='slice'><Link to="/products"><div><i className="fas fa-tshirt"></i></div></Link></li>
              <li className='slice'><div>✪</div></li>
              <li className='slice'><div>☀</div></li>
            </ul>
          </div>
        </>
        }
      </header>
    )
  }
}
export default Navbar