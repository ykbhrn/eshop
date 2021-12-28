import React from 'react'
import { getAllDiscounts, addDiscount, getMyProfile } from '../../lib/api'


class PopupDiscount extends React.Component {
  state = {
    discountTime: null,
    discountScore: 0,
    discountHighScore: false,
    discountLowScore: false,
    user: null,
    discountCounter: 0
  }

  async componentDidMount () {
    const res = await getAllDiscounts()
    const resTwo = await getMyProfile()
    this.setState({discountTime: res.data[0].time, user: resTwo.data})

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
    setTimeout( async () => {
      const discountPage = document.querySelector('.discount-page')
      const discountPopup = document.querySelector('.discount-popup-wrapper')

      discountPopup.style.visibility = "hidden"
      // discountPopup.style.display = "hidden"
      discountPage.classList.remove("show-discount")
      
      if (this.state.discountScore > this.state.user.discount) {
        const formData = {discount: this.state.discountScore}
        await addDiscount(formData)
        const res = await getMyProfile()
        this.setState({discountHighScore: true, user: res.data, discountCounter: this.state.discountCounter + 1})
      } else {
        this.setState({discountLowScore: true, discountCounter: this.state.discountCounter + 1})
      }
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
    const discountPage = document.querySelector('.discount-page')
    const discountPopup = document.querySelector('.discount-popup-wrapper')
    const availableHeight = window.innerHeight
    const availableWidth = window.innerWidth

    discountPopup.style.visibility = "visible"
    discountPopup.style.display = "block"

    const popupInterval = setInterval(() => {
      const positionX = Math.floor(Math.random() * availableWidth)
      const positionY = Math.floor(Math.random() * availableHeight)

      discountPopup.style.left = positionX + 'px'
      discountPopup.style.top = positionY + 'px'

      if (this.state.discountCounter > 0) {
        clearInterval(popupInterval)
      }
    }, 900);
    discountPage.classList.add("show-discount")
    window.scrollTo(0, 0)
  }

  slap = () => {
    const discountPage = document.querySelector('.discount-page')

    if (discountPage.classList.contains("show-discount")) {
      discountPage.style.animation = "cursor 0.2s linear"
      setTimeout(() => {
        discountPage.style.animation = "none"
      }, 210);
    }
  }

  slapped = async () => {
    const discountPopup = document.querySelector('.discount-popup-wrapper')
    
    discountPopup.style.transform = "rotate3d(1, 0, 1, 70deg)"
    this.setState({discountScore: this.state.discountScore + 5})
    setTimeout(() => {
      discountPopup.style.transform = "none"
    }, 210);
  }

  closeScorePage = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.user) return null
    return (
      <div className="discount-page" onClick={this.slap}>

        {/* <h1>Slap That Nazi</h1> */}

        <div className="discount-popup-wrapper" onClick={this.slapped}>
        </div>
        
        {this.state.discountHighScore && 
        <div className="score-window">
          <h2>
            <span className="highlighted">Congratulations </span>, You Have Slapped <span className="highlighted">{this.state.discountScore / 5} nazi&#39;s </span> 
            which means we are giving you <span className="highlighted">{this.state.user.discount}% discount </span>
          on your order
          </h2>
          <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>
        </div>
        }

        {this.state.discountLowScore &&   
        <div className="score-window">
          <h2>
        You slapped <span className="highlighted">{this.state.discountScore / 5} nazi&#39;s</span><br />
        so your current discount of <span className="highlighted">{this.state.user.discount}% remain unchanged</span>
          </h2>
          <div className="classic-btn" onClick={this.closeScorePage}>Continue</div>
        </div>
        }
      </div>
    )
  }
}
export default PopupDiscount