import React from 'react'
import { getAllDiscounts, addDiscount, getMyProfile } from '../../lib/api'


class PopupDiscount extends React.Component {
  state = {
    discountTime: null,
    discountScore: 0,
    discountHighScore: false,
    discountLowScore: false,
    user: null
  }

  async componentDidMount () {
    const res = await getAllDiscounts()
    const resTwo = await getMyProfile()

    const now = new Date()
    this.setState({discountTime: res.data[0].time, user: resTwo.data})

    if (now.getMinutes() === res.data[0].time) {
      console.log("first")
      this.showHand()
      this.discountAnimationEnd()
    } 

    setInterval(() => {
      const now = new Date()
      if (now.getMinutes() === this.state.discountTime) {
        console.log("first")
        this.showHand()
        this.discountAnimationEnd()
      }
      this.changeDiscountTime()
    }, 60000)
  }

  discountAnimationEnd = async () => {
    setTimeout( async () => {
      const discountPage = document.querySelector('.discount-page')
      const discountPopup = document.querySelector('.discount-popup-wrapper')

      discountPopup.style.visibility = "hidden"
      discountPage.classList.remove("show-discount")
      
      if (this.state.discountScore > this.state.user.discount) {
        const formData = {discount: this.state.discountScore}
        await addDiscount(formData)
        const res = await getMyProfile()
        this.setState({discountHighScore: true, user: res.data})
      } else {
        this.setState({discountLowScore: true})
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

    window.setInterval(() => {
      const positionX = Math.floor(Math.random() * availableWidth)
      const positionY = Math.floor(Math.random() * availableHeight)

      discountPopup.style.left = positionX + 'px'
      discountPopup.style.top = positionY + 'px'
    }, 900);
    discountPage.classList.add("show-discount")
  }

  slap = () => {
    const discountPage = document.querySelector('.discount-page')

    discountPage.style.animation = "cursor 0.2s linear"
    setTimeout(() => {
      discountPage.style.animation = "none"
    }, 210);
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
    this.setState({discountLowScore: false, discountHighScore: false})
  }

  render() {
    return (
      <div className="discount-page" onClick={this.slap}>
        <div className="discount-popup-wrapper" onClick={this.slapped}>
        </div>
        {this.state.discountHighScore && 
        <div onClick={this.closeScorePage}>
          Congratulations, You Slapped {this.state.discountScore / 5} nazi&#39;s which means we are giving you {this.state.user.discount}% discount
          on your order
        </div>
        }

        {this.state.discountLowScore && 
        <div onClick={this.closeScorePage}>
          You slapped {this.state.discountScore / 5} nazi&#39;s <br />
          so your current discount of {this.state.user.discount}% remain unchanged
        </div>
        }
      </div>
    )
  }
}
export default PopupDiscount