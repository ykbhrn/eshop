import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { getSingleUsedItem } from '../../lib/api'
import {seo} from '../../lib/functions'

class SingleItem extends React.Component {
  state = {
    item: null,
    bigImage: '',
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      const itemId = this.props.match.params.id;
      const res = await getSingleUsedItem(itemId);

      seo({
        title: res.data.title,
        metaDescription: res.data.description
      });

      this.setState({ item: res.data, bigImage: res.data.images[0], imagesArray: res.data.images[0].images });

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

  render() {
    const { item } = this.state

    if (!item) return null

    const newName = item.name.replaceAll(' ', '-');

    return (
      <div className="single-product-section change-brightness">

        <style>
          {'\
          .donation-icon{\
            display: flex;\
          }\
          '}
        </style>
        
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
            <div className="single-product-image" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
            </div>
          </div>
          <div className="single-product-side-info-wrapper">

            <div className="name-price-wrapper">

              <div className="single-product-name">
                <h1>{item.title}</h1>
              </div>

              <div className="product-price-wrapper">
                <div className="product-price">£{item.price}</div>
              </div>

            </div>

          </div>
        </div>

        <div className="product-description">
        </div>

      </div>
    )
  }
}



export default SingleItem