import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => (
  <>
    <img className="footer-border-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1646093394/Nu%20Hippies/Backgrounds/black_zszqlq.jpg" />

    <div className="footer-wrapper change-brightness">
      <img className="footer-background" src="https://res.cloudinary.com/nuhippies/image/upload/v1646093394/Nu%20Hippies/Backgrounds/white_tyksen.jpg" />

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
          <li>Slapping Donation</li>
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