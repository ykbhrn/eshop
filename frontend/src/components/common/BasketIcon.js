import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { basketLength } from '../../lib/api'

const BasketIcon = ({ basketLength }) => (
          <div className="basket-icon-wrapper">
            <img src="/images/basket.png" />
            <div className="basket-number">{basketLength}</div>
          </div>
)
export default BasketIcon