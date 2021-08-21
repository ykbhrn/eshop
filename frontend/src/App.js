import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { basketLength } from './lib/api'

import Home from './components/common/Home'
import AllProducts from './components/products/AllProducts'
import SingleProduct from './components/products/SingleProduct'
import Authorization from './components/auth/Authorization'
import Profile from './components/common/Profile'
import Navbar from './components/common/Navbar'
import BasketIcon from './components/common/BasketIcon'
import Done from './components/common/Done'

class App extends React.Component {
  state = {
    basketLength: null,
  }

  async componentDidMount() {
    try {
      const res = await basketLength()
      this.setState({ basketLength: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  basket = async () => {
    try {
      const res = await basketLength()
      this.setState({ basketLength: res.data })
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
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/products/:id' render={(props) => <SingleProduct {...props} basket={this.basket} />} />
          <Route path="/products" component={AllProducts} />
          <Route path="/entering" component={Authorization} />
          <Route path="/profile" component={Profile} />
          <Route path="/done" component={Done} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App