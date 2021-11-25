import React from 'react'

class Done extends React.Component {
  state = {
    redirect: false,
    progress: 100,
    timeBeforeRedirect: 3000,
  }

  componentDidMount() {
    //After five seconds to fire render redirect
    setTimeout(() => this.setState({ redirect: true }), this.state.timeBeforeRedirect)
    return  setInterval(() => this.progressReducer(this.state.progress), this.state.timeBeforeRedirect / 100)
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
      <div className="done-page">
        {this.renderRedirect()}
        <div className="progress-wrapper">
          <h1 className="title is-1"> 
            Your acount was created. Welcome
          </h1>
          <progress value={this.state.progress} max="100"></progress>
        </div>
      </div>
    )
  }
}

export default Done