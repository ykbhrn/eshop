import React from 'react'

class Privacy extends React.Component {
  state = {
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
      </>
    )
  }
}

export default Privacy