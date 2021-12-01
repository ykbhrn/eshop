import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getMyProfile } from './lib/api'

import Home from './components/common/Home'
import CategoriziedProducts from './components/products/CategoriziedProducts'
import AllProducts from './components/products/AllProducts'
import SingleProduct from './components/products/SingleProduct'
import Authorization from './components/auth/Authorization'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Profile from './components/profile/Profile'
import EditAccount from './components/profile/EditAccount'
import EditAdress from './components/profile/EditAdress'
import YourOrders from './components/profile/YourOrders'
import Navbar from './components/common/Navbar'
import Basket from './components/common/Basket'
import BasketIcon from './components/common/BasketIcon'
import Checkout from './components/common/Checkout'
import Shipping from './components/common/Shipping'
import Payment from './components/common/Payment'
import Contact from './components/common/Contact'
import About from './components/common/About'
import PopupDiscount from './components/common/PopupDiscount'
import Done from './components/common/Done'

class App extends React.Component {
  state = {
    basketLength: null,
  }

  async componentDidMount() {
    try {
      const res = await getMyProfile()
      let basketSize = 0
      res.data.basket.map(item => {
        basketSize = basketSize + Number(item.chosenQuantity)
      })
      this.setState({ basketLength: basketSize })
    } catch (err) {
      console.log(err)
    }
  }

  basket = async () => {
    try {
      const res = await getMyProfile()
      let basketSize = 0
      res.data.basket.map(item => {
        basketSize = basketSize + Number(item.chosenQuantity)
      })
      this.setState({ basketLength: basketSize })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <BasketIcon
          basketLength={this.state.basketLength}
        />
        <PopupDiscount />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/products/:subcategory/:gender/:type" component={CategoriziedProducts} />
          <Route path='/products/:id' render={(props) => <SingleProduct {...props} basket={this.basket} />} />
          <Route path="/products" component={AllProducts} />
          <Route path="/entering/:id" component={Authorization} />
          <Route path="/entering" component={Authorization} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/profile/edit" component={EditAccount} />
          <Route path="/profile/adress" component={EditAdress} />
          <Route path="/profile/orders" component={YourOrders} />
          <Route path="/profile" component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/basket' render={(props) => <Basket {...props} basket={this.basket} />} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/done" component={Done} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App