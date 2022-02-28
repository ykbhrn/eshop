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
import Confirmation from './components/common/Confirmation'
import Contact from './components/common/Contact'
import Footer from './components/common/Footer'
import About from './components/common/About'
import Terms from './components/common/Terms'
import Privacy from './components/common/Privacy'
import PopupDiscount from './components/common/PopupDiscount'
import Done from './components/common/Done'

class App extends React.Component {
  state = {
    basketLength: null,
    showFooter: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      this.setState({showFooter: true})
      const res = await getMyProfile()
      let basketSize = 0
      res.data.basket.map(item => {
        basketSize = basketSize + Number(item.chosenQuantity)
      })
      this.setState({ basketLength: basketSize })
      window.onscroll = function () { 
        const logo = document.querySelector(".logo")
        const productsNavbarIcon = document.querySelector(".products-navbar-icon")
        const navbarPart = document.querySelector(".navbar-part")
        const basketIcon = document.querySelector(".basket-icon-wrapper")
        const basketNumber = document.querySelector(".basket-number")
        const shadow = document.querySelector(".shadow")
        const flowerElement = document.querySelectorAll(".flower-container")

        // if (!window.matchMedia("(pointer: coarse)").matches) {
        //   this.setState({ mainButton: hoveredItem })
        // }

        if (document.documentElement.scrollTop > 50) {

          logo.classList.add("logo-scroll")
          logo.style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1646061516/Nu%20Hippies/Backgrounds/IconOnly_Transparent_1_pox2bq.png)"
          basketIcon.classList.add("basket-icon-scroll")
          navbarPart.style.boxShadow = "5px -29px 108px 16px black"
          productsNavbarIcon.classList.add("products-navbar-icon-scroll")
          basketNumber.classList.add("basket-number-scroll")
          if (shadow) {
            shadow.classList.add("shadow-scroll")
          }
        } else if (document.documentElement.scrollTop < 50) {

          logo.classList.remove("logo-scroll")
          logo.style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1646061516/Nu%20Hippies/Backgrounds/FullLogo_Transparent_e1l1fn.png)"
          basketIcon.classList.remove("basket-icon-scroll")
          navbarPart.style.boxShadow = "none"
          productsNavbarIcon.classList.remove("products-navbar-icon-scroll")
          basketNumber.classList.remove("basket-number-scroll")
          if (shadow) {
            shadow.classList.remove("shadow-scroll")
          }
        }

        if (flowerElement[0]) {
          if (document.documentElement.scrollTop > 550) {
            flowerElement[0].style.position = "fixed"
            flowerElement[1].style.position = "fixed"
            flowerElement[0].style.left = "3px"
            flowerElement[1].style.right = "3px"
            flowerElement[0].style.top = "70px"
            flowerElement[1].style.top = "70px"
          } else if (document.documentElement.scrollTop < 550) {
            flowerElement[0].style.position = "relative"
            flowerElement[1].style.position = "relative"
            flowerElement[0].style.left = "15px"
            flowerElement[1].style.right = "15px"
            flowerElement[0].style.top = "100px"
            flowerElement[1].style.top = "100px"
          }
        }

      }
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

  scrolling = () => {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    console.log(scrollTop)
  }

  render() {
    return (
      <BrowserRouter>
        <div className="whole-page" onScroll={this.scrolling}>
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
            <Route path="/confirmation/:type" component={Confirmation} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/done" component={Done} />
          </Switch>
        </div>
        {this.state.showFooter &&
          <Footer />
        }
      </BrowserRouter>
    )
  }
}

export default App