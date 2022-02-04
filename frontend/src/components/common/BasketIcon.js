import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

const BasketIcon = ({ basketLength }) => (
  <>
    {isAuthenticated() &&
    <Link to="/basket">
      <div className="basket-icon-wrapper change-brightness">
        <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639597935/Nu%20Hippies/icons/basket_v8tsou.png" />
        <div className="basket-number">{basketLength}</div>
      </div>
    </Link>
    }

    {!isAuthenticated() &&
    <Link to="/entering">
      <div className="basket-icon-wrapper change-brightness">
        <img src="https://res.cloudinary.com/nuhippies/image/upload/v1639597935/Nu%20Hippies/icons/basket_v8tsou.png" />
        <div className="basket-number">{basketLength}</div>
      </div>
    </Link>
    }
  </>
)
export default BasketIcon