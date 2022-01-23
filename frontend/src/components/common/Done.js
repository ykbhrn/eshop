import React from 'react'
import { getMyProfile } from '../../lib/api'

class Done extends React.Component {
  state = {
    user: null,
    redirect: false,
    progress: 100,
    timeBeforeRedirect: 5000,
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getMyProfile()
      //After five seconds to fire render redirect
      this.setState({ user: res.data })
      setTimeout(() => this.setState({ redirect: true }), this.state.timeBeforeRedirect)
      return  setInterval(() => this.progressReducer(this.state.progress), this.state.timeBeforeRedirect / 100)
    } catch (err) {
      console.log(err)
    }
  }

  progressReducer = (currentNum) => {
    if (this.state.progress > 0){
      const decrementedNumber = currentNum - 1
      this.setState({ progress: decrementedNumber })
    }
    
  }

  renderRedirect = () => {
    if (this.state.redirect){
      return  window.location.assign('/')
    }
  }

  render() {
    if (!this.state.user) return null
    return (
      <div className="done-page">
        {this.renderRedirect()}
        <div className="progress-wrapper">
          <h1> 
            Your acount was created. Welcome {this.state.user.name}
          </h1>
          <progress value={this.state.progress} max="100"></progress>
        </div>
      </div>
    )
  }
}

export default Done