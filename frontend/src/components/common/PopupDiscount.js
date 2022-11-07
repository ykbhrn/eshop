import React from 'react'
import { getAllDiscounts, addDiscount, getMyProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class PopupDiscount extends React.Component {
  state = {
    discountTime: null,
    discountScore: 0,
    discountHighScore: false,
    discountLowScore: false,
    discountZero: false,
    user: null,
    discountCounter: 0,
    slapped: false,
    isDemoAnimation: false
  }

  async componentDidMount () {
    const res = await getAllDiscounts() 

    if (isAuthenticated()) {
      const resTwo = await getMyProfile()
      this.setState({discountTime: res.data[0].time, user: resTwo.data})
    }

    if (this.props.showHand === true) {
      this.showHand()
      this.demoAnimationEnd()
    }

    setTimeout(() => {
      const now = new Date()
      if (now.getMinutes() === res.data[0].time && window.location.pathname !== "/discount" && window.location.pathname !== "/shipping" && window.location.pathname !== "/second-hand/post-item" 
      && window.location.pathname !== "/checkout" && window.location.pathname !== "/payment" && window.location.pathname !== "/confirmation/credit-card" && window.location.pathname !== "/confirmation/bank-transfer") {
        this.showHand()
        this.discountAnimationEnd()
      }

      this.changeDiscountTime()

      setInterval(() => {
        const now = new Date()
        if (now.getMinutes() === this.state.discountTime) {
          this.showHand()
          this.discountAnimationEnd()
        }
        this.changeDiscountTime()
      }, 60000)

    }, 30000)
  }


  discountAnimationEnd = async () => {

    const discount = localStorage.getItem('discount')

    setTimeout( async () => {

      if (discount) {
  
        if (this.state.discountScore > Number(discount)) {

          if (this.state.discountScore > 25) {
            localStorage.setItem('discount', 25)
          } else {
            localStorage.setItem('discount', this.state.discountScore)
          }
        }
        
      } else {
  
        localStorage.setItem('discount', this.state.discountScore) 
        
      }

      const discountPage = document.querySelector('.discount-page')
      const discountPopup = document.querySelector('.discount-popup-wrapper')
      const discountPageHeader = document.querySelector('.discount-page h1')

      discountPopup.style.visibility = "hidden"
      discountPageHeader.style.visibility = "hidden"
      discountPopup.style.display = "none"
      discountPage.classList.remove("show-discount")

      if (this.state.user) {

        if (this.state.discountScore > this.state.user.discount) {
  
          const formData = {discount: this.state.discountScore}
          await addDiscount(formData)
          const res = await getMyProfile()
          this.setState({discountHighScore: true, user: res.data, discountCounter: this.state.discountCounter + 1})
  
        } else if (this.state.discountScore !== 0){
  
          this.setState({discountLowScore: true, discountCounter: this.state.discountCounter + 1})
            
        } else {
          this.setState({discountZero: true, discountCounter: this.state.discountCounter + 1})
        }
  
      } else {
        if (this.state.discountScore > discount) {
  
          this.setState({discountHighScore: true, discountCounter: this.state.discountCounter + 1})
  
        } else if (this.state.discountScore !== 0){
  
          this.setState({discountLowScore: true, discountCounter: this.state.discountCounter + 1})
  
        } else {
          this.setState({discountZero: true, discountCounter: this.state.discountCounter + 1})
        }
      }

      setTimeout(() => {
        window.location.reload()
      }, 45000);
    
    }, 30000)

  }

  demoAnimationEnd = () => {
    setTimeout(() => {
      const discountPage = document.querySelector('.discount-page')
      const discountPopup = document.querySelector('.discount-popup-wrapper')
      const discountPageHeader = document.querySelector('.discount-page h1')

      discountPopup.style.visibility = "hidden"
      discountPageHeader.style.visibility = "hidden"
      discountPopup.style.display = "none"
      discountPage.classList.remove("show-discount")
      this.setState({ isDemoAnimation: true })

      setTimeout(() => {
        window.location.reload()
      }, 45000);

    }, 30000);
  }

  changeDiscountTime = async () => {
    try {
      const res = await getAllDiscounts()
      this.setState({discountTime: res.data[0].time})
    } catch (err) {
      console.log(err)
    }
  }

  showHand = () => {
    seo({
      title: "GET READY, HERE IT IS!!",
      metaDescription: "Slap Putin and get discount"
    });

    const discountPage = document.querySelector('.discount-page')
    const discountPageHeader = document.querySelector('.discount-page h1')
    const discountPopup = document.querySelector('.discount-popup-wrapper')
    const changeBrightness = document.querySelectorAll('.change-brightness')
    const site = document.body

    const availableHeight = window.innerHeight
    const availableWidth = window.innerWidth

    changeBrightness.forEach(item => {
      item.style.filter = "brightness(0.7)"
    })

    site.style.background = "gray"

    const popupInterval = setInterval(() => {

      const positionX = Math.floor(Math.random() * availableWidth)
      const positionY = Math.floor(Math.random() * availableHeight)

      if (!this.state.slapped) {
        discountPopup.style.left = positionX + 'px'
        discountPopup.style.top = positionY + 'px'

        discountPopup.style.visibility = "visible"
      }

      // discountPopup.style.left = '150px'
      // discountPopup.style.top = '150px'

      if (this.state.discountCounter > 0) {
        clearInterval(popupInterval)
      }
    }, 700);

    discountPage.classList.add("show-discount")
    discountPageHeader.style.visibility = "visible"
    window.scrollTo(0, 0)
  }

  slap = () => {
    const discountPage = document.querySelector('.discount-page')
    const discountPageHeader = document.querySelector('.discount-page h1')

    if (discountPage.classList.contains("show-discount")) {

      if (!this.state.slapped) {

        discountPage.style.animation = "cursor 0.2s linear"
        discountPageHeader.style.animation = "cursor 0.2s linear"

        setTimeout(() => {
          discountPage.style.animation = "none"
          discountPageHeader.style.animation = "none"
        }, 210);
        
      }
    }
  }

  slapped = async () => {
    const discountPopup = document.querySelector('.discount-popup-wrapper')
    const discountImg = document.querySelector('.discount-popup-img')

    discountImg.style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1647315083/Nu%20Hippies/icons/sad-putin-removebg-preview_bsgh82.png)"
    
    if (!this.state.slapped) {
        
      this.setState({slapped: true})
      discountImg.style.transform = "rotate3d(1, 0, 1, 40deg)"

      setTimeout(() => {
        discountPopup.style.visibility = "hidden"

        setTimeout(() => {
          discountImg.style.transform = "none"
          discountImg.style.backgroundImage = "url(https://res.cloudinary.com/nuhippies/image/upload/v1647314930/Nu%20Hippies/icons/putin-face-115498498412qs003gfss_eyzlgc-removebg-preview_llwmjt.png)"
          this.setState({slapped: false, discountScore: this.state.discountScore + 5})
        }, 1000);
      }, 1100);
    }
  }

  closeScorePage = () => {
    window.location.reload()
  }

  render() {
    const discount = localStorage.getItem('discount')

    // console.log(this.state.discountScore)
    return (
      <div className="discount-page" onClick={this.slap}>

        <h1>Slap The Mad Dictator</h1>

        <div className="discount-popup-wrapper" onClick={this.slapped}>

          {this.state.slapped &&
          <img className="discount-stars" src="/images/stars.gif"/>
          }

          <div className="discount-popup-img"></div>

        </div>

        {this.state.slapped &&

          <div className="discount-plus">+ 5%</div>

        }
        
        {this.state.discountHighScore &&   

        <div className="score-window">

          <SecondHandNavbar />

          <img src="https://res.cloudinary.com/nuhippies/image/upload/v1652244409/Nu%20Hippies/Backgrounds/giphy_s6lpuz.gif" />

          <div className="header-btn-score">

            <h2>
              <span>You slapped a mad dictator </span><span className="highlighted">{this.state.discountScore / 5} time(s).</span> 
            This means that we will give you <span className="highlighted">{this.state.user ? this.state.user.discount : discount}% discount on your next order</span>
            </h2>

            <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>

          </div>


        </div>
        }


        {this.state.discountLowScore &&   

        <div className="score-window">

          <SecondHandNavbar />

          <img src="https://res.cloudinary.com/nuhippies/image/upload/v1652244409/Nu%20Hippies/Backgrounds/giphy_s6lpuz.gif" />

          <div className="header-btn-score">

            <h2>
          You slapped a mad dictator <span className="highlighted">{this.state.discountScore / 5} time(s).</span><br />
          This means your current discount of <span className="highlighted">{this.state.user ? this.state.user.discount : discount}% remains unchanged</span>
            </h2>

            <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>

          </div>


        </div>

        }
        

        {this.state.discountZero &&   

          <div className="score-window">

            <SecondHandNavbar />

            <img src="https://res.cloudinary.com/nuhippies/image/upload/v1652244409/Nu%20Hippies/Backgrounds/giphy_s6lpuz.gif" />

            <div className="header-btn-score">

              <h2>
                Unfortunately, you did not slap any mad dictator, better luck next time.
              </h2>

              <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>

            </div>


          </div>
        }

        {this.state.isDemoAnimation &&   

        <div className="score-window">

          <SecondHandNavbar />

          <img src="https://res.cloudinary.com/nuhippies/image/upload/v1652244409/Nu%20Hippies/Backgrounds/giphy_s6lpuz.gif" />
          {/* <img src="https://res.cloudinary.com/nuhippies/image/upload/v1651183896/Nu%20Hippies/Backgrounds/1960s_2Bsign_2B_15_wnj0qb.jpg" /> */}

          <div className="header-btn-score">

            <h2>
              <span>You slapped mad dictator </span><span className="highlighted">{this.state.discountScore / 5} time(s). </span> 
              In the real try, it would mean <span className="highlighted">{this.state.discountScore}% discount on your next order</span>
            </h2>

            <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>

          </div>


        </div>
        } 
      </div>
    )
  }
}
export default PopupDiscount