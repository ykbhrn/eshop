import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getSingleUsedItem, createChat } from '../../lib/api'
import {seo} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class SingleItem extends React.Component {
  state = {
    item: null,
    bigImage: '',
    isLoading: false,
    posted: ""
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      const itemId = this.props.match.params.id;
      const res = await getSingleUsedItem(itemId);

      const firstArray = res.data.createdAt.split("T")
      const dateArray = firstArray[0].split("-").reverse().join("/")
      const timeArray = firstArray[1].split("")

      //Temporary hard coded London time zone
      timeArray[1] = Number(timeArray[1])
      const finishedTimeArray = timeArray.slice(0, 5).join("")
                      
      seo({
        title: res.data.title + "| NHM",
        metaDescription: res.data.description
      });

      this.setState({ item: res.data, bigImage: res.data.images[0], imagesArray: res.data.images,
        posted: dateArray + " " + finishedTimeArray});

    } catch (err) {
      console.log(err);
    }
  } 

  hideOverflow = () => {
    const bod = document.querySelector('body');
    
    if (window.innerHeight > bod.scrollHeight || window.innerHeight === bod.scrollHeight) {
      bod.style.overflowY = 'hidden';
      setTimeout(() => {
        bod.style.overflowY = 'visible';
      }, 1000);
    }
  }

  changeBigImage = (image) => {
    this.setState({ bigImage: image });
  }

  showImages = () => {
    this.state.item.images.map(image => {
      
      return <div className={`side-image ${image === this.state.bigImage ? "chosen-side-image" : ""}`} style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={() => {
        this.changeBigImage(image);
      }} key={image}></div>
    })
    
  }

  handleProductInfo = (item) => {
    this.setState({productInfo: item})
  }

  startChat = async (user) => {
    try {
      const res = await createChat({secondUserId: user})

      window.location.assign(`/chats/${res.data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { item } = this.state

    if (isAuthenticated()) {
      if (!item || !this.props.user) return null
    } else {
      if (!item) return null
    }
    console.log(item)
    const newName = item.title.replace(/ /g, '-')

    return (
      <>
        <SecondHandNavbar />
      
        <div className="single-product-section single-item-page">
        
          <div className="single-product-wrapper">
            <div className="single-product-images-wrapper">
              <div className="side-images-container">
                {this.state.imagesArray.map(image => {
                  return <div className={`side-image ${image === this.state.bigImage ? "chosen-side-image" : ""}`} style={{
                    backgroundImage: `url(${image})`,
                  }}
                  onClick={() => {
                    this.changeBigImage(image);
                  }} key={image}></div>
                })}
              </div>

              <div className='image-posted-wrapper'>

                <div className="single-product-image" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
                </div>

                <div className='date-single-item'>
                  Posted: {this.state.posted}              
                </div>

              </div>
            
            </div>

            <div className="single-items-side-info-wrapper">

              <div className="name-price-wrapper">

                <div className="single-product-name">
                  <h1>{item.title}</h1>
                </div>

                <div className="product-price-wrapper">
                  <div className="product-price">£{item.price}</div>
                </div>

              </div>

              <div className="category-size-wrapper">
                <div>
              Category: {item.category}
                </div>
                <div>
              Size: {item.size}
                </div>
                <div>
              Item Location: {item.placeName}
                </div>
              </div>

              {isAuthenticated() && item.user._id !== this.props.user._id &&
            <div className='start-chat-wrapper' onClick={() => {
              this.startChat(item.user._id)
            }}>
              <i className="fa-regular fa-comment"></i>
              <div>Send message to {item.user.name}</div>
            </div>
              }

              {isAuthenticated() && item.user._id === this.props.user._id &&
                <Link to={`/second-hand/edit-item/${newName}/${item._id}`}>
                  <div className='add-edit-button'>
                    <i className="fas fa-edit"></i> Edit Your Ad
                  </div>
                </Link>
              }

              {!isAuthenticated() &&
                  <Link to={`/entering/items/${newName}/${item._id}`}>
                    <div className='start-chat-wrapper'>
                      <i className="fa-regular fa-comment"></i>
                      <div>Send message to {item.user.name}</div>
                    </div>
                  </Link>
              }

            </div>

            <div className="description-contact-wrapper">
              <div className="product-description">{item.description}</div>
              <div className="single-item-contact">
                <div>Email: {item.email}</div>
                <div>Phone number: {item.phone}</div>
              </div>
            </div>

          </div>


        </div>
      </>
    )
  }
}



export default SingleItem