import React from 'react'
import { getMyProfile } from '../../lib/api'
import PopupDiscount from './PopupDiscount'
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class Donation extends React.Component {
  state = {
    discount: 0,
    discountDemo: false
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Slap Putin and get discount | Nu Hippies",
        metaDescription: "We gave peace a chance but there are people who deserve a slap. We will give you 5% discount for each slap of Putin."
      });

      const res = await getMyProfile()
      this.setState({discount: res.data.discount})
    } catch (err) {
      console.log(err)
    }
  }

  popupDemo = () => {
    this.setState({discountDemo: true})
  }

  render() {
    return (
      <>
        <SecondHandNavbar />
        
        {this.state.discountDemo &&
        <PopupDiscount 
          showHand={true}
        />
        }
        <div className="donation-page change-brightness">

          <img className="donation-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1651183896/Nu%20Hippies/Backgrounds/1960s_2Bsign_2B_15_wnj0qb.jpg" />

          <div className="donation">
            <h1>Nu Hippies Slapsgiving</h1>
            <p>
              <p><strong>We gave peace a chance but there are people who deserve a slap.</strong></p>
            The rules are pretty simple. At random time, once in a half an hour, Putin&#39;s face show up and run arround your screen. 
            When Putin shows up, your mouse cursor become hand and you are ready to slap. On smartphones you can just use your finger. For every slap you give him, we will give you 5% discount on your next order. 
            Maximum limit for discount is 25%.
              {/* <p>So happy slapsgiving</p> */}
            </p>
            <p>
            You are currently on <strong>{this.state.discount}% level</strong>
            </p>

            <div className="classic-btn" onClick={this.popupDemo} title="Slap a Putin's face">
              Try Demo
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default Donation