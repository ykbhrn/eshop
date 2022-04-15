import React from 'react'
import { getMyProfile } from '../../lib/api'

class Donation extends React.Component {
  state = {
    donation: 0
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

  render() {
    return (
      <div className="about-page change-brightness">
        <div className="form-wrapper donation">
          <h1>Slap &#38; Donate</h1>
          <p>
            The rules are pretty simple. At random time, once in a half an hour, Putin&#39;s face show up and run arround your screen. 
            When Putin shows up, your mouse curso become hand and you are ready to slap. On smartphones you can just use your finger. For every slap you give him, we will donate 5% of your order amount to <a href="https://donate.redcross.org.uk/appeal/ukraine-crisis-appeal">British Red Cross </a> 
            to help with humanitarian aid in Ukraine. Maximum limit for donation is 25% of your order.
            {/* <p>So happy slapsgiving</p> */}
          </p>
          <p>
            You are currently on {this.state.donation}% level
          </p>

          <img className="donation-img" src="https://preview.redd.it/jw1v76uccdl81.png?width=640&crop=smart&auto=webp&s=be84ef50a3bde9c9262a0de944c49792274fd71c" />

        </div>
      </div>
    )
  }
}

export default Donation