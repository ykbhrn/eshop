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
      <section className="hero is-light is-fullheight-with-navbar">
        {/* Dont redirect if user just booked the slot */}
        {this.renderRedirect()}
        <div className="hero-body done">
          <h1 className="title is-1"> 
            Váš účet bol úspešne vytvorený. Vitajte
            {/* Check what kind of request we want */}
          </h1>
          <progress className="progress is-large is-link" value={this.state.progress} max="100"></progress>
        </div>
      </section>
    )
  }
}

export default Done