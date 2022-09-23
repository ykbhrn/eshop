import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'

class Home extends React.Component {
  state = {
    text: null
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

  render() {
    return (
      <>
        <div className="home-page change-brightness" >
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

          <div className="all" onMouseLeave={() => {
            this.revealText("")
          }}>

            {/* <div className="lefter">
              <div className="text">Hosting</div>
            </div> */}
            <Link to="/forum" className="left" onMouseEnter={() => {
              this.revealText("Forum")
            }}>
              <div className="hidden-text">Forum</div>
            </Link>

            <Link to="/second-hand" className="center" onMouseEnter={() => {
              this.revealText("Second Hand Market")
            }}>
              <div className="explainer"></div>
              <div className="hidden-text">Second Hand Market</div>
            </Link>

            <Link to="/products" className="right" onMouseEnter={() => {
              this.revealText("Our Shop")
            }}>
              <div className="hidden-text">Our Shop</div>
            </Link>
            
            {/* <div className="righter">
              <div className="text">SEO</div>
            </div> */}

            <div className="text">
              {this.state.text}
            </div>
          
          </div>

        </div>
      </>
    );
  }
}


export default Home;