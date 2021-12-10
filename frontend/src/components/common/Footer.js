import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => (

  <div className="footer-wrapper">
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

    <div className="footer-menu-wrapper">
      <ul className="footer-menu">
        <li>About US</li>
        <li>Contact Us</li>
        <li>Terms and Conditions</li>
        <li>Privacy Policy</li>
        <li>Delivery</li>
        <li>Returns</li>
        <li>Discount Game Rules</li>
      </ul>
    </div>

    <div className="social-media-icons">
      <i className="fab fa-instagram"></i>
      <i className="fab fa-facebook"></i>
      <i className="fab fa-twitter"></i>

    </div>
   
    
  </div>
)
export default Footer