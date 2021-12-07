import React from 'react'
import { getAllDiscounts } from '../../lib/api'


class PopupDiscount extends React.Component {
  state = {
    some: null,
    discountTime: null
  }

  async componentDidMount () {
    const res = await getAllDiscounts()
    const now = new Date()
    this.setState({discountTime: res.data[0].time})

    if (now.getMinutes() === res.data[0].time) {
      console.log("first")
      this.showHand()
      setTimeout(() => {
        const discountPage = document.querySelector('.discount-page')
        const discountPopup = document.querySelector('.discount-popup-wrapper')

        discountPopup.style.visibility = "hidden"
        discountPage.classList.remove("show-discount")
      }, 30000);
    } 

    setInterval(() => {
      const now = new Date()
      if (now.getMinutes() === this.state.discountTime) {
        console.log("first")
        this.showHand()
        setTimeout(() => {
          const discountPage = document.querySelector('.discount-page')
          const discountPopup = document.querySelector('.discount-popup-wrapper')

          discountPopup.style.visibility = "hidden"
          discountPage.classList.remove("show-discount")
        }, 30000);
      }
      this.changeDiscountTime()
    }, 60000)
  }

  async changeDiscountTime () {
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
    }, 1000);
    discountPage.classList.add("show-discount")
  }

  slap = () => {
    const discountPage = document.querySelector('.discount-page')

    discountPage.classList.add("show-discount")
    discountPage.style.animation = "cursor 0.2s linear"
    setTimeout(() => {
      discountPage.style.animation = "none"
    }, 210);
  }

  slapped = () => {
    const discountPopup = document.querySelector('.discount-popup-wrapper')

    discountPopup.style.transform = "rotate3d(1, 0, 1, 70deg)"
    // setTimeout(() => {
    //   discountPopup.style.transform = "none"
    // }, 210);
  }

  render() {
    return (
      <div className="discount-page" onClick={this.slap}>
        <div className="discount-popup-wrapper" onClick={this.slapped}>
        </div>
      </div>
    )
  }
}
export default PopupDiscount