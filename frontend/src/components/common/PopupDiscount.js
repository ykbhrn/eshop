import React from 'react'
import { getAllDiscounts, addDiscount, getMyProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

class PopupDiscount extends React.Component {
  state = {
    discountTime: null,
    discountScore: 0,
    discountHighScore: false,
    discountLowScore: false,
    discountZero: false,
    user: null,
    discountCounter: 0,
    slapped: false
  }

  async componentDidMount () {
    const res = await getAllDiscounts()

    if (isAuthenticated()) {
      const resTwo = await getMyProfile()
      this.setState({discountTime: res.data[0].time, user: resTwo.data})
    }

    setTimeout(() => {
      const now = new Date()
      if (now.getMinutes() === res.data[0].time) {
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

          if (this.state.discountScore > 40) {
            localStorage.setItem('discount', 40)
          } else {
            localStorage.setItem('discount', this.state.discountScore)
          }
        }
        
      } else {
  
        localStorage.setItem('discount', this.state.discountScore) 
        
      }

      const discountPage = document.querySelector('.discount-page')
      const discountPopup = document.querySelector('.discount-popup-wrapper')

      discountPopup.style.visibility = "hidden"
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
    
    }, 30000)
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
    const discountPage = document.querySelector('.discount-page')
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
    window.scrollTo(0, 0)
  }

  slap = () => {
    const discountPage = document.querySelector('.discount-page')

    if (discountPage.classList.contains("show-discount")) {
      if (!this.state.slapped) {
        discountPage.style.animation = "cursor 0.2s linear"
        setTimeout(() => {
          discountPage.style.animation = "none"
        }, 210);
      }
    }
  }

  slapped = async () => {
    const discountPopup = document.querySelector('.discount-popup-wrapper')
    const discountImg = document.querySelector('.discount-popup-img')
    
    if (!this.state.slapped) {
        
      this.setState({slapped: true})
      discountImg.style.transform = "rotate3d(1, 0, 1, 90deg)"

      setTimeout(() => {
        discountPopup.style.visibility = "hidden"

        setTimeout(() => {
          discountImg.style.transform = "none"
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

    // if (!this.state.user) return null
    return (
      <div className="discount-page" onClick={this.slap}>

        {/* <h1>Slap That Nazi</h1> */}

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
          <h2>
            <span className="highlighted">Congratulations </span>, You Have Slapped <span className="highlighted">{this.state.discountScore / 5} nazi&#39;s </span> 
            which means we are giving you <span className="highlighted">{this.state.user ? this.state.user.discount : discount}% discount </span>
          on your next order
          </h2>
          <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>
        </div>
        }

        {this.state.discountLowScore &&   
        <div className="score-window">
          <h2>
        You slapped <span className="highlighted">{this.state.discountScore / 5} nazi&#39;s</span><br />
        so your current discount of <span className="highlighted">{this.state.user ? this.state.user.discount : discount}% remain unchanged</span>
          </h2>
          <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>
        </div>
        }
        {this.state.discountZero &&
          <div className="score-window">
            <h2>
              You didn&#39;t slap any nazi which means no discount for you now, good luck next time 
            </h2>
            <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>
          </div>
        }
      </div>
    )
  }
}
export default PopupDiscount