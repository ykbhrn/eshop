import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class SecondHandNavbar extends React.Component {
  state = {
    mainButton: "",
    text: '',
    slogan: 1
  }

  async componentDidMount() {
    const number = Math.round(Math.random() * 10)

    if (number > 5) {
      this.setState({slogan: 2})
    } else {
      this.setState({slogan: 1})
    }
  }

  revealText = (option) => {
    this.setState({ text: option })
  }

  changeMainButton = (hoveredItem) => {
    if (!window.matchMedia("(pointer: coarse)").matches) {
      this.setState({ mainButton: hoveredItem })
    }
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  render() {
    return (
      <div className="second-hand-navbar">

        <a href="/" className="link-no-underline" alt="Home Page">
          
          <div className="menu" onMouseLeave={() => {
            this.revealText("")
          }}>

            <div className="logo label"></div>

            <div className="spacer"></div>
            <Link to="/second-hand" className="item one" onMouseEnter={() => {
              this.revealText("Second Hand Market")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>
            <Link to="/products" className="item two" onMouseEnter={() => {
              this.revealText("Our Shop")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>
            <Link to="/forum" className="item three" onMouseEnter={() => {
              this.revealText("Forum")
            }} onMouseLeave={() => {
              this.revealText("")
            }}></Link>
            
          </div>
        </a>

        {this.state.slogan === 1 &&
          <h1 className="slogan-header">Bring Hippies <br /> Back</h1>
        }

        {this.state.slogan === 2 &&
          <h1 className="slogan-header">Make Fashion <br /> Slow Again</h1>
        }
        
      </div>
    )
  }
}
export default SecondHandNavbar