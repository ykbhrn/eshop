import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getMyProfile } from './lib/api'
import { isAuthenticated } from './lib/auth'

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
import MainMenu from './components/common/MainMenu'
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
import Donation from './components/common/Donation'
import Done from './components/common/Done'
import UsedItems from './components/second-hand/UsedItems'
import SingleItem from './components/second-hand/SingleItem'
import CategorizedItems from './components/second-hand/CategorizedItems'
import SecondHandNavbar from './components/second-hand/SecondHandNavbar'
import Maps from './components/map/Maps'
import PostUsedItem from './components/second-hand/PostUsedItem'

// var pointerX = -1;
// var pointerY = -1;
// document.onclick = function(event) {
//   const cursorGif = document.querySelector(".cursor-gif")

//   pointerX = event.pageX - 150;
//   pointerY = event.pageY - 85;
  
//   cursorGif.style.left = pointerX + 'px'
//   cursorGif.style.top = pointerY + 'px'

//   cursorGif.style.display = "block"

//   setTimeout(() => {
//     cursorGif.style.display = "none"
//   }, 1000);

// }

window.onscroll = function () { 
  const logo = document.querySelectorAll(".logo")
  const productsNavbarIcon = document.querySelector(".products-navbar-icon")
  const basketIcon = document.querySelector(".basket-icon-wrapper")
  const basketNumber = document.querySelector(".basket-number")
  const flowerElement = document.querySelectorAll(".flower-container")
  const vanImg = document.querySelector(".products-banner img")

  if (document.documentElement.scrollTop > 10) {

    logo[1].classList.add("logo-scroll")
    logo[1].style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1646102026/Nu%20Hippies/Backgrounds/simple-logo_fpnqch.png)"
    logo[0].classList.add("logo-scroll")
    logo[0].style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1646102026/Nu%20Hippies/Backgrounds/simple-logo_fpnqch.png)"
    basketIcon.classList.add("basket-icon-scroll")
    productsNavbarIcon.classList.add("products-navbar-icon-scroll")
    basketNumber.classList.add("basket-number-scroll")
  } else if (document.documentElement.scrollTop < 10) {

    logo[1].classList.remove("logo-scroll")
    logo[1].style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1655114968/Nu%20Hippies/icons/mainlogo1_ypgmou.png)"
    logo[0].classList.remove("logo-scroll")
    logo[0].style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1655114968/Nu%20Hippies/icons/mainlogo1_ypgmou.png)"
    basketIcon.classList.remove("basket-icon-scroll")
    productsNavbarIcon.classList.remove("products-navbar-icon-scroll")
    basketNumber.classList.remove("basket-number-scroll")
  }

  if (flowerElement[0]) {

    if (document.documentElement.scrollTop > (window.location.pathname === "/products" ? 605 : 690) ){
      flowerElement[0].style.position = "fixed"
      flowerElement[1].style.position = "fixed"
      flowerElement[0].style.left = "3px"
      flowerElement[1].style.right = "3px"
      flowerElement[0].style.top = "0px"
      flowerElement[1].style.top = "0px"
    } else if (document.documentElement.scrollTop < (window.location.pathname === "/products" ? 605 : 690)) {
      flowerElement[0].style.position = "relative"
      flowerElement[1].style.position = "relative"
      flowerElement[0].style.left = "15px"
      flowerElement[1].style.right = "15px"
      flowerElement[0].style.top = "0px"
      flowerElement[1].style.top = "0px"
    }

  }

  const randomNumber = Math.round(Math.random() * 100)
  const availableWidth = window.innerWidth
  const scrolled = document.documentElement.scrollTop
  const vanPosition = scrolled * (availableWidth / 430)
  const body = document.body

  if (vanImg) {

    if (vanPosition > (availableWidth - vanImg.offsetWidth)) {
      body.style.overflowX = "hidden"
    } else {
      body.style.overflowX = "visible"
    }

    if (vanPosition > availableWidth) {
      vanImg.style.left = `${availableWidth}px`
    } else {
      vanImg.style.left = `${vanPosition}px`
    }

    if (vanPosition > (availableWidth * 0.2) && vanPosition < (availableWidth * 0.5)) {
      vanImg.style.top = "60px"
    } else if (vanPosition > (availableWidth * 0.5)){
      vanImg.style.top = "120px"
    } else {
      vanImg.style.top = "0px"
    }
  }

}

class App extends React.Component {
  state = {
    products: [],
    user: null,
    basketLength: null,
    showFooter: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const phoneMenuSlice = document.querySelector(".slice:nth-child(2)")

      const ua = window.navigator.userAgent;
      const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      const isPhone = window.matchMedia("(pointer: coarse)").matches

      if (isPhone && iOS) {
        phoneMenuSlice.style.overflow = "auto"
      }

      if (isAuthenticated()) {
        const res = await getMyProfile()

        let basketSize = 0
        res.data.basket.map(item => {
          basketSize = basketSize + Number(item.chosenQuantity)
        })

        this.setState({ basketLength: basketSize, showFooter: true, user: res.data })

      } else {
        this.setState({ showFooter: true })
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

  render() {
    return (
      <BrowserRouter>
        <div className="whole-page">
          {/* <img className="cursor-gif" src="" /> */}
          <BasketIcon
            basketLength={this.state.basketLength}
          />
          <PopupDiscount />
          <Navbar />
          <SecondHandNavbar />
          <MainMenu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/products/:subcategory/:typeOne/:typeTwo/:typeThree" component={CategoriziedProducts} />
            <Route path='/products/:name/:id' render={(props) => <SingleProduct {...props} basket={this.basket} />} />
            <Route path="/products" component={AllProducts} />
            <Route path="/entering/:name/:id" component={Authorization} />
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
            <Route path="/discount" component={Donation} />
            <Route path="/done" component={Done} />
            <Route path="/second-hand/items/:name/:id" component={SingleItem} />
            <Route path="/second-hand/post-item" component={PostUsedItem} />
            <Route path="/second-hand/:category/:gender" render={(props) => <CategorizedItems {...props} user={this.state.user} />} />
            <Route path="/second-hand" component={UsedItems} />
            <Route path="/maps" component={Maps} />
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