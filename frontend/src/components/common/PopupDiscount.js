import React from 'react'


class PopupDiscount extends React.Component {
  state = {
    some: null,
    showDiscount: false,
    discountCounter: 0,
  }

  async componentDidMount () {
    setInterval(() => {
      const now = new Date()
      const randomNumber = Math.floor(Math.random() * 60)
      if (now.getMinutes() === 49 && this.state.discountCounter < 1) {
        this.setState({showDiscount: true, discountCounter: this.state.discountCounter + 1})
        console.log(this.state.discountCounter)
      } else if (now.getMinutes() !== 49 && this.state.discountCounter < 1) {
        this.setState({showDiscount: false})
        console.log(this.state.discountCounter, "else")
      } else if (now.getMinutes() !== 49 && this.state.discountCounter === 1) {
        this.setState({showDiscount: false, discountCounter: this.state.discountCounter + 1})
        console.log(this.state.discountCounter, "else another")
      } 
    }, 60000)
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