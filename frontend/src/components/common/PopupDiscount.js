import React from 'react'
import { getAllDiscounts } from '../../lib/api'


class PopupDiscount extends React.Component {
  state = {
    some: null,
    showDiscount: false,
    discountCounter: 0,
    discountTime: null
  }

  async componentDidMount () {
    setInterval(() => {
      const now = new Date()
      if (now.getMinutes() === this.state.discountTime && this.state.discountCounter < 1) {
        this.setState({showDiscount: true, discountCounter: this.state.discountCounter + 1})
        console.log(this.state.discountCounter)
      } else if (now.getMinutes() !== this.state.discountTime && this.state.discountCounter < 1) {
        this.setState({showDiscount: false})
        this.changeDiscountTime()
        console.log(this.state.discountCounter, "else")
      } else if (now.getMinutes() !== this.state.discountTime && this.state.discountCounter === 1) {
        this.setState({showDiscount: false, discountCounter: this.state.discountCounter + 1})
        console.log(this.state.discountCounter, "else another")
      } 
    }, 60000)
  }

  async changeDiscountTime () {
    try {
      const res = await getAllDiscounts()
      this.setState({discountTime: res.data[0].time})
      console.log(res.data[0].time)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        {this.state.showDiscount &&
        <h1>
        no co ako sa mamem? 
        </h1>
        }
      </div>
    )
  }
}
export default PopupDiscount