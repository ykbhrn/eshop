import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => (
  <>
    <div className="footer-wrapper change-brightness">

      <div className="header">
        <a href="/" className="link-no-underline">
          <div className="logo"></div>
        </a>
        <ul className="dynamic-txts">
          <li><span>bring</span></li>
          <li><span>hippies</span></li>
          <li><span>back</span></li>
        </ul>
      </div>

      <div className="footer-menu-wrapper">
        <ul className="footer-menu">
          <Link to="/about"><li>About US</li></Link>
          <Link to="/contact"><li>Contact Us</li></Link>
          <Link to="/terms"><li>Terms and Conditions</li></Link>
          <Link to="/privacy"><li>Privacy Policy</li></Link>
          <Link to="/donation"><li>Slapping Donation</li></Link>
        </ul>
      </div>

      <div className="social-media-icons">
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook"></i>
        <i className="fab fa-twitter"></i>

      </div>
   
    
    </div>
  </>
)
export default Footer