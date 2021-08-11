import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import AllProducts from './components/products/AllProducts'
import SingleProduct from './components/products/SingleProduct'
import Authorization from './components/auth/Authorization'
import Profile from './components/common/Profile'
import Navbar from './components/common/Navbar'
import Done from './components/common/Done'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/products/:id' component={SingleProduct} />
      <Route path="/products" component={AllProducts} />
      <Route path="/entering" component={Authorization} />
      <Route path="/profile" component={Profile} />
      <Route path="/done" component={Done} />
    </Switch>
  </BrowserRouter>
)

export default App