import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

const BasketIcon = ({ basketLength }) => (
  <>
    {isAuthenticated() &&
    <Link to="/basket" title="Shopping Basket">
      <div className="basket-icon-wrapper change-brightness">
        <div className="basket-number">{basketLength}</div>
      </div>
    </Link>
    }

    {!isAuthenticated() &&
    <Link to="/entering" title="Shopping Basket">
      <div className="basket-icon-wrapper change-brightness">
        <div className="basket-number">{basketLength}</div>
      </div>
    </Link>
    }
  </>
)
export default BasketIcon