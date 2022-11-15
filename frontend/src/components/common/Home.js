
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'

class Home extends React.Component {
  state = {
    text: null,
    showEye: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Nu Hippies Movement",
        metaDescription: {mainMetaDescription}
      });

    } catch (err) {
      console.log(err)
    }
  }

  revealText = (option) => {
    this.setState({ text: option })
  }

  removeImage = () => {
    const backgroundImage = document.querySelector(".home-background-image")
    backgroundImage.style.opacity = "1"
  }

  handleEyeAndImage = () => {

    const backgroundImage = document.querySelector(".home-background-image")
    backgroundImage.style.opacity = "0"

    if (this.state.showEye === false) {
      this.setState({showEye: true})

      setTimeout(() => {
        this.setState({showEye: false})
      }, 2150);
    }
    
  }

  render() {
    return (
      <>
        <div className="home-page" >
          <style>
            {'\
          .basket-icon-wrapper{\
            display: none;\
          }\
          .navbar{\
            display: none;\
          }\
          .main-menu-wrapper{\
            display: none;\
          }\
          .phone-menu-wrapper{\
            display: none;\
          }\
          '}
          </style>

          <div className="home-title-wrapper"><h1>Nu Hippies Movement</h1>
            <div className="header">
              <ul className="dynamic-txts">
                <li><span>bring</span></li>
                <li><span>hippies</span></li>
                <li><span>back</span></li>
              </ul>
            </div>
          </div>

          {this.state.showEye &&
          <img className='eye-gif' src="https://res.cloudinary.com/nuhippies/image/upload/v1668012375/Nu%20Hippies/Backgrounds/5745900f6a92cea845c89215ab90af-unscreen_jxq98i.gif" />
          }

          <img className='home-background-image' src="https://res.cloudinary.com/nuhippies/image/upload/v1668006967/Nu%20Hippies/Backgrounds/ce6e76ce6cb55fedae6d2b2c126309e3-removebg-preview_miv1fd.png" />

          <div className='all-wrapper' onMouseLeave={this.removeImage}>

            <div className="all" onMouseEnter={this.handleEyeAndImage} onMouseLeave={() => {
              this.revealText("")
            }}>

              {/* <div className="lefter">
              <div className="text">Hosting</div>
            </div> */}

              <Link to="/products" className="left home-menu-item" onMouseEnter={() => {
                this.revealText("Our Shop")
              }}>
                <div className="hidden-text">Our Shop</div>
              </Link>

              <div className="explainer"></div>

              <Link to="/second-hand" className="center home-menu-item" onMouseEnter={() => {
                this.revealText("Second Hand Market")
              }}>
                <div className="hidden-text">Second Hand Market</div>
              </Link>

              <Link to="/forum" className="right home-menu-item" onMouseEnter={() => {
                this.revealText("Forum")
              }}>
                <div className="hidden-text">Forum</div>
              </Link>
            
              {/* <div className="righter">
              <div className="text">SEO</div>
            </div> */}

              {this.state.text &&
            <div className="text">
              {this.state.text}
            </div>
              }
          
            </div>

          </div>

        </div>
      </>
    );
  }
}


export default Home;