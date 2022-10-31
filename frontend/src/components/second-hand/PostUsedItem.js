import React from 'react'
import { createUsedItem } from '../../lib/api'
import axios from 'axios'
import Geocoder from 'react-mapbox-gl-geocoder'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

const mapAccess = {
  mapboxApiAccessToken: 'pk.eyJ1IjoibnVoaXBwaWVzIiwiYSI6ImNsNXN6bG0yeTAyMjAzaXA3ZDMyYjlvdDgifQ.DSvTjZ3H-vfRDSIsUYLw8Q'
}

const mapStyle = {
  width: '100%',
  height: 600
}

const queryParams = {
  country: 'gb'
}

const uploadUrl = "https://api.cloudinary.com/v1_1/nuhippies/upload"
const uploadPreset = "i3lbcv7c"

class PostUsedItem extends React.Component {
  state = {
    formData: {
      title: '',
      description: '',
      images: [],
      price: '',
      category: '',
      gender: '',
      size: '',
      coordinates: '',
      placeName: false,
      phone: '',
      email: ''
    },
    viewport: {},
    adPosition: 1,
    isLoading: false,
    error: '',
    errors: false
  }

  handleChange = event => {
    if (event.target.name === "category" && this.state.formData.gender === "men" &&
      (event.target.value === "Tops" || event.target.value === "Skirts" || event.target.value === "Dresses")) {
      const formData = { ...this.state.formData, category: '' }
      this.setState({ formData, error: '' })
    } else {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value }
      this.setState({ formData, error: '' })
    }
  }

  handleGender = (option) => {
    if (option === "men" && (this.state.formData.category === "Skirts" || this.state.formData.category === "Dresses"
    || this.state.formData.category === "Tops")) {
      const formData = { ...this.state.formData, gender: '' }
      this.setState({ formData, error: '' })
    } else {
      const formData = { ...this.state.formData, gender: option }
      this.setState({ formData })
    }
  }

handleSubmit = async event => {
  event.preventDefault()
  try {
    if (this.state.formData.coordinates) {
      this.setState({errors: false, isLoading: true})
      const res = await createUsedItem(this.state.formData) 
      console.log(res.data)
      this.setState({adPosition: this.state.adPosition + 1, isLoading: false})
    } else {
      this.setState({errors: "Enter your adress or postcode, and choose your location from the list"})
    }
  } catch (err) {
    this.setState({ errors: 'Something went wrong', isLoading: false })
  }
}

onSelected = (viewport, item) => {
  const formData = { ...this.state.formData, coordinates: [item.center[0], item.center[1]], placeName: item.place_name }

  this.setState({viewport, formData});
  console.log('Selected: ', item)
}

  setUrl = imgUrl => {
    const newImages = this.state.formData.images
    newImages.push(imgUrl)
    const formData = { ...this.state.formData, images: newImages }
    this.setState({ formData })
    this.forceUpdate()
  }

  handleUpload = async event => {
    try {
      this.setState({ isLoading: true })
      const data = new FormData()
      data.append('file', event.target.files[0])
      data.append('upload_preset', uploadPreset)
      const res = await axios.post(uploadUrl, data)
      this.setState({ isLoading: false })
      this.setUrl(res.data.url)
    } catch (err) {
      console.log('err=', err)
    }
  }

  handleNext = (option) => {
    if (option === "+") {
      if (this.state.adPosition === 1) {
        if (this.state.formData.gender && this.state.formData.category) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Choose category and type of your item"})
        }
      } else if (this.state.adPosition === 2) {
        if (this.state.formData.size) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Type size of the item"})
        }
      } else if (this.state.adPosition === 3) {
        if (this.state.formData.title && this.state.formData.description) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Write description and title of the ad"})
        }
      } else if (this.state.adPosition === 4) {
        if (this.state.formData.images.length > 0) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Upload photos of the item"})
        }
      } else if (this.state.adPosition === 5) {
        if (this.state.formData.price) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Type the item price"})
        }
      } else if (this.state.adPosition === 6) {
        if (this.state.formData.phone || this.state.formData.email) {
          this.setState({adPosition: this.state.adPosition + 1, errors: false})
        } else {
          this.setState({errors: "Provide your phone number or email"})
        }
      } else if (this.state.adPosition === 8) {
        window.location.assign("/profile/ads")
      } 
    } else if (option === "-") {
      this.setState({adPosition: this.state.adPosition - 1})
    }
  }

  removeImage = (image) => {
    const imagesArray = this.state.formData.images
    const index = imagesArray.indexOf(image)
    imagesArray.splice(index, 1)
    const formData = { ...this.state.formData, images: imagesArray }
    this.setState({ formData })
  }

  render() {
    const {viewport, formData} = this.state
    console.log(formData)
    return (
      <>
        <SecondHandNavbar />
      
        <div className="post-item-page">
          
          {this.state.adPosition < 8 &&
        <h1>Post an ad</h1>
          }

          {this.state.adPosition === 1 &&
          <>
            <h2>Category:</h2>
            <select id="category" 
              // className={`${errors.country ? 'error-input' : ''}`}
              name="category"
              onChange={this.handleChange}
              value={formData.category}
            >
              {!this.state.formData.category &&
              <option selected>Choose here</option>
              }
              <option value="T-Shirts">T-Shirts</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Dresses">Dresses</option>
              <option value="Skirts">Skirts</option>
              <option value="Tops">Tops</option>
              <option value="Pants">Pants</option>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
              <option value="Shorts">Shorts</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Sweatshirts">Sweatshirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Others">Others</option>
            </select>  

            <div className="gender-options-wrapper">
              <div className={`gender-option ${this.state.formData.gender === "women" ? "selected" : ""}`} onClick={() => {
                this.handleGender("women")
              } }>Women</div>
              <div className={`gender-option ${this.state.formData.gender === "men" ? "selected" : ""}`} onClick={() => {
                this.handleGender("men")
              } }>Men</div>
              <div className={`gender-option ${this.state.formData.gender === "uni" ? "selected" : ""}`} onClick={() => {
                this.handleGender("uni")
              } }>Uni</div>
            </div>

            <div className="error">{this.state.errors}</div>
          </>
          }

          {this.state.adPosition === 2 &&
        <>
          <h2>Size:</h2>
          <input 
            className="size-input"
            name="size"
            onChange={this.handleChange}
            value={formData.size}
          />
  
          <div className="error">{this.state.errors}</div>
        </>
          }

          {this.state.adPosition === 3 &&
                <div className="post-description">
                  <h2>Ad Title</h2>
                  <input
                    name="title"
                    onChange={this.handleChange}
                    value={formData.title}
                  />

                  <h2>Ad Description</h2>
                  <textarea
                    name="description"
                    onChange={this.handleChange}
                    value={formData.description}
                    cols="50" rows="7"
                  />

                  <div className="error">{this.state.errors}</div>
                </div>
          } 

          {this.state.adPosition === 4 &&
        <>
          <h2>Item Photos:</h2>
          <input
            // className={`input ${error.url ? 'is-danger' : ''}`}
            name="images"
            type="file"
            multiple="multiple"
            onChange={this.handleUpload}
          />

          <div className="uploaded-images-container">
            {this.state.formData.images.map(image => {
              return <div key={image} className="uploaded-image-wrapper">
                <img className="ad-uploaded-image" src={image} />
                <img className="close" src="https://res.cloudinary.com/nuhippies/image/upload/v1662775134/Nu%20Hippies/icons/70975_close_delete_icon_kubvux.png" 
                  onClick={() => {
                    this.removeImage(image)
                  }}
                />
              </div>
            })
            }
          </div>

          <div className="error">{this.state.errors}</div>
        </>
          }

          {this.state.adPosition === 5 &&
        <>
          <h2>Price:</h2>
          <input
            name="price"
            type="number"
            min="0"
            onChange={this.handleChange}
            value={formData.price}
          />

          <div className="error">{this.state.errors}</div>
        </>
          }

          {this.state.adPosition === 6 &&
        <>
          <h2>Your Contact Details:</h2>
          <label>Email:</label>
          <input
            name="email" 
            onChange={this.handleChange}
            value={formData.email}
          />

          <label>Phone Number:</label>
          <input
            name="phone"
            type="number"
            min="0"
            onChange={this.handleChange}
            value={formData.phone}
          />

          <div className="error">{this.state.errors}</div>

        </>
          }

          {this.state.adPosition === 7 &&
        <div className="adress-input-wrapper">
          <h2>Enter Your Postcode or Adress:</h2>

          <form className="navbar-search">
            <Geocoder
              {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
              queryParams={queryParams} initialViewState={{
                zoom: 30.5,
              }}
              placeholder="add your postcode"
            />
          </form>

          {this.state.formData.placeName &&
          <div className="place-wrapper">
            <img src="https://res.cloudinary.com/nuhippies/image/upload/v1663281183/Nu%20Hippies/icons/pin_glwy25.png" />
            {this.state.formData.placeName}
          </div>   
          }

          <div className="error">{this.state.errors}</div>
       
        </div>
          }

          <div className="post-buttons-wrapper">

            {this.state.adPosition > 1 && this.state.adPosition < 8 &&
          <div className="classic-btn post" onClick={() => {
            this.handleNext("-") 
          }}>Back</div> 
            }

            {this.state.isLoading &&
            <div className="classic-btn btn-loading">
              <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
            </div>
            }

            {!this.state.isLoading && this.state.adPosition >= 1 && this.state.adPosition <= 6 &&
          <div className="classic-btn post" onClick={() => {
            this.handleNext("+") 
          }}>Next</div> 
            }

            {!this.state.isLoading && this.state.adPosition === 7 &&
          <div className="classic-btn post" onClick={this.handleSubmit}>Post</div> 
            }

          </div>

          {this.state.adPosition > 7 &&
        <div className="uploaded-item">

          <div className="uploaded-item-description">Your ad was uploaded and it is now public</div>
          
          <div className="classic-btn post" onClick={() => {
            this.handleNext("+") 
          }}>Continue</div> 

        </div>
          }
        </div>
      </>
    )
  }
}

export default PostUsedItem
