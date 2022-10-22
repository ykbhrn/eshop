import React from 'react'
import { getMyProfile } from '../../lib/api'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class ErrorPage extends React.Component {
  state = {
    redirect: false,
    progress: 100,
    timeBeforeRedirect: 5000,
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      //After five seconds to fire render redirect
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
    return (
      <>
        <SecondHandNavbar />
        <div className="done-page change-brightness">
          {this.renderRedirect()}
          <div className="progress-wrapper">
            <h1> 
            You are not authorized to access this page. You will be transferred to Home page
            </h1>
            <progress value={this.state.progress} max="100"></progress>
          </div>
        </div>
      </>
    )
  }
}

export default ErrorPage