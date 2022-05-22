import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => (
  <>
    <div className="footer-wrapper change-brightness">

      <div className="footer-menu-wrapper">
        <ul className="footer-menu">
          <Link to="/about" title="Who we are?"><li>About US</li></Link>
          <Link to="/contact" title="Send us a message"><li>Contact Us</li></Link>
          <Link to="/terms" title="terms"><li>Terms and Conditions</li></Link>
          <Link to="/privacy" title="privacy policy"><li>Privacy Policy</li></Link>
          <Link to="/discount" title="Slap Putin and get discount"><li>Slapsgiving Rules</li></Link>
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