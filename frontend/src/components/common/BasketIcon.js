import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

const BasketIcon = ({ basketLength }) => (
  <Link to="/basket">
    <div className="basket-icon-wrapper">
      <img src="/images/basket.png" />
      <div className="basket-number">{basketLength}</div>
    </div>
  </Link>
)
export default BasketIcon