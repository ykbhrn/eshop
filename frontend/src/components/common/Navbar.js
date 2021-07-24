import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getPortfolio, getAllUsers, turnOffNotifications } from '../../lib/api'
class Navbar extends React.Component {
  state = {
    some: null
  }



  render() {
    return (
      <header className="navbar">
        {/* <div className="logo">
          P<span className="hidden-vowels">ea</span>c<span className="hidden-vowels">e</span>f<span className="hidden-vowels">u</span>ll
          <span className="hidden-vowels">y</span>
        </div> */}
        <div className="header">
          <div className="static-txt">Peacefully <span>&#174;</span> </div>
          <ul className="dynamic-txts">
            <li><span>bring</span></li>
            <li><span>hippies</span></li>
            <li><span>back</span></li>
          </ul>
        </div>
      </header>
    )
  }
}
export default Navbar