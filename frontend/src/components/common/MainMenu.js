import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getMyProfile } from '../../lib/api'

class MainMenu extends React.Component {
  state = {
    mainButton: ""
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
      <div className="main-menu-wrapper">

        <div className="main-menu">

          <nav>
            <ol>

              <li className="menu-item item one">
                <a href="/">Home</a>
                <ol className="sub-menu">
                  <li className="menu-item"><Link to="/forum">Forum</Link></li>
                  <li className="menu-item"><Link to="/products">Our Shop</Link></li>
                  <li className="menu-item"><Link to="/second-hand">Second Hand Market</Link></li>
                </ol>
              </li>

              <li className="menu-item item two">
                <Link to="/about">About Us</Link>
              </li>

              <li className="menu-item item three">
                <Link to="/discount">Slapsgiving</Link>
              </li>

              <li className="menu-item item four">
                {isAuthenticated() &&
                  <Link to="/second-hand/post-item">Post Ad</Link>
                }
          
                {!isAuthenticated() &&
                  <Link to="/entering">Post Ad</Link>
                }
              </li>

              <li className="menu-item item five">
                {isAuthenticated() &&
                <>
                  <Link to="/profile">Profile</Link>
                  <ol className="sub-menu">
                    <li className="menu-item"><Link to="/profile/orders">Your Orders</Link></li>
                    <li className="menu-item"><Link to="/profile/ads">Your Ads</Link></li>
                    <li className="menu-item"><Link to="/chats">Chat</Link></li>
                  </ol>
                </>
                }
                {!isAuthenticated() &&
                <>
                  <Link to="/entering">Profile</Link>
                  <ol className="sub-menu">
                    <li className="menu-item"><Link to="/entering">Your Orders</Link></li>
                    <li className="menu-item"><Link to="/entering">Your Ads</Link></li>
                    <li className="menu-item"><Link to="/entering">Chat</Link></li>
                  </ol>
                </>
                }
              </li>
              
            </ol>
          </nav>

          {/* <div className="spacer"></div> */}

          <div className='main-menu-icon label'></div>

            
        </div>

      </div>
    )
  }
}
export default MainMenu



// <div className="main-menu-wrapper">
//   <Link to="#" className='button ctrl' tabIndex='1'>
//     {this.state.mainButton &&
//         <div className="menu-button-text">{this.state.mainButton}</div>
//     }
//     <div className="main-menu-button">
//       <i id="ctrl-button" className="fa-solid fa-xmark"></i>
//     </div>
//   </Link>

//   <div className='main-menu-rotate'>
//     <ul id="main-menu-ul" className='tip ctrl'>

//       <li className='slice'>
//         <div onMouseEnter={() => {
//           this.changeMainButton("Slapsgiving")
//         }}
//         onMouseLeave={this.mainButtonBack}>
//           <Link to="/discount" title="Rules of Slapsgiving game">
//             <span>
//               <i className="fa-solid fa-hands"></i>
//             </span>
//           </Link>
//         </div>
//       </li>

//       <li className='slice'>
//         <div onMouseEnter={() => {
//           this.changeMainButton("Post an Item")
//         }}
//         onMouseLeave={this.mainButtonBack} >

//           {isAuthenticated() &&
//           <Link to="/second-hand/post-item" title="Post a second hand item">   
//             <span>
//               <i className="fas fa-folder-plus"></i>
//             </span>
//           </Link>
//           }

//           {!isAuthenticated() &&
//           <Link to="/entering" title="Post a second hand item">   
//             <span>
//               <i className="fas fa-folder-plus"></i>
//             </span>
//           </Link>
//           }

//         </div>
//       </li>

//       <li className='slice'>
//         <div onMouseEnter={() => {
//           this.changeMainButton("Home")
//         }}
//         onMouseLeave={this.mainButtonBack}>
//           <Link to="/" title="Homepage">
//             <span>
//               <i className="fa-solid fa-house"></i>
//             </span>
//           </Link>
//         </div>
//       </li>

//       <li className='slice'>
//         <div onMouseEnter={() => {
//           this.changeMainButton("Chat")
//         }}
//         onMouseLeave={this.mainButtonBack}>

//           {isAuthenticated() &&
//           <Link to="/chats" title="Messages">
//             <span>
//               <i className="fa-solid fa-comments"></i>
//             </span>
//           </Link>
//           }

//           {!isAuthenticated() &&
//           <Link to="/entering" title="Messages">
//             <span>
//               <i className="fa-solid fa-comments"></i>
//             </span>
//           </Link>
//           }

//         </div>
//       </li>

//       {isAuthenticated() &&
//         <li className='slice'>
//           <div onMouseEnter={() => {
//             this.changeMainButton("My Account")
//           }}
//           onMouseLeave={this.mainButtonBack}>
//             <Link to="/profile" title="Your Profile">
//               <span>
//                 <i className="fas fa-user"></i>
//               </span>
//             </Link>

//           </div>
//         </li>
//       }
            
//       {!isAuthenticated() &&
//         <li className='slice'>
//           <div onMouseEnter={() => {
//             this.changeMainButton("Register")
//           }}
//           onMouseLeave={this.mainButtonBack}>
//             <Link to="/entering" title="Sign in">
//               <span>
//                 <i className="fas fa-user"></i>
//               </span>
//             </Link>
//           </div>
//         </li>
//       }
//     </ul>
//   </div>
// </div>
