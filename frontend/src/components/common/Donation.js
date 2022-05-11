import React from 'react'
import { getMyProfile } from '../../lib/api'
import PopupDiscount from './PopupDiscount'

class Donation extends React.Component {
  state = {
    donation: 0,
    discountDemo: false
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)
      const res = await getMyProfile()
      this.setState({donation: res.data.discount})
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
        {this.state.discountDemo &&
        <PopupDiscount 
          showHand={true}
        />
        }
        <div className="about-page change-brightness">

          <div className="form-wrapper donation">
            <h1>Slap &#38; Donate</h1>
            <p>
              <p><strong>We gave peace a chance but there are people who deserve a slap.</strong></p>
            The rules are pretty simple. At random time, once in a half an hour, Putin&#39;s face show up and run arround your screen. 
            When Putin shows up, your mouse curso become hand and you are ready to slap. On smartphones you can just use your finger. For every slap you give him, we will donate 5% of your order amount to <a href="https://donate.redcross.org.uk/appeal/ukraine-crisis-appeal" target="_blank" rel="noopener noreferrer">British Red Cross </a> 
            to help with humanitarian aid in Ukraine. Maximum limit for donation is 25% of your order.
              {/* <p>So happy slapsgiving</p> */}
            </p>
            <p>
            You are currently on {this.state.donation}% level
            </p>

            <div className="donation-img-btn-wrapper">
              <img className="donation-img" src="https://res.cloudinary.com/nuhippies/image/upload/v1650073587/Nu%20Hippies/icons/jw1v76uccdl81_lxralr.png" />

              <div className="classic-btn" onClick={this.popupDemo} title="Slap a Putin's face">
              Try Demo
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default Donation