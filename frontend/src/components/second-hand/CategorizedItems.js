import React from 'react';
import { Link } from 'react-router-dom';
import { getAllUsedItems, updateUserAccount } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'
import Geocoder from 'react-mapbox-gl-geocoder'

const mapAccess = {
  mapboxApiAccessToken: 'pk.eyJ1IjoibnVoaXBwaWVzIiwiYSI6ImNsNXN6bG0yeTAyMjAzaXA3ZDMyYjlvdDgifQ.DSvTjZ3H-vfRDSIsUYLw8Q'
}

const mapStyle = {
  width: '100%',
  height: 600
}

const queryParams = {
  country: 'sk'
}

const MyInput = (props) => <input {...props} placeholder="Add your postcode or adress" />


class CategorizedItems extends React.Component {
  state = {
    items: [],
    hoveredProductId: '',
    text: null,
    viewport: {},
    isMenu: null,
    placeName: false,
    coordinates: [],
    distance: 25,
    isLoading: false
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })

      window.scrollTo(0, 0)

      seo({
        title: "NHM Second Hand",
        metaDescription: {mainMetaDescription}
      });

      const res = await getAllUsedItems();

      // if (isAuthenticated()) {
      //   this.setState({ items: res.data.reverse(), isLoading: false, placeName: this.props.user.preferencePlaceName ? this.props.user.preferencePlaceName : false, 
      //     coordinates: this.props.user.preferenceCoordinates ? this.props.user.preferenceCoordinates : []
      //   });
      //   console.log(this.state)
      // } else {
      this.setState({ items: res.data.reverse(), isLoading: false });
      // }

    } catch (err) {
      console.log(err)
    }
  }

  onSelected = async (viewport, item) => {
    this.setState({ isLoading: true })

    const res = await getAllUsedItems()

    if (isAuthenticated()) {
      const som = await updateUserAccount({preferenceCoordinates: [item.center[0], item.center[1]], preferencePlaceName: item.place_name})
    } else {
      localStorage.setItem('coordinates', [item.center[0], item.center[1]])
      localStorage.setItem('placeName', item.place_name)
    }

    const filteredProducts = res.data.filter(product => {
      if (this.getDistanceFromLatLonInKm(item.center[1], item.center[0], product.coordinates[1], product.coordinates[0]) < this.state.distance) {
        return product
      }
    })

    this.setState({items: filteredProducts.reverse(), viewport, placeName: item.place_name, coordinates: [item.center[0], item.center[1]], isLoading: false});

    console.log('Selected: ', item)
  }

  handleDistance = async (event) => {
    this.setState({ isLoading: true })

    const res = await getAllUsedItems()

    const distance = Number(event.target.value) * 1.60934


    if (isAuthenticated()) {
      const som = await updateUserAccount({preferenceDistance: distance})
      console.log(som.data)
    } else {
      localStorage.setItem('distance', distance)
    }

    const filteredProducts = res.data.filter(product => {
      if (event.target.value === "Whole Country") {
        return product
      } else if (this.getDistanceFromLatLonInKm(this.state.coordinates[1], this.state.coordinates[0], product.coordinates[1], product.coordinates[0]) < distance) {
        return product
      }
    })

    this.setState({items: filteredProducts.reverse(), distance: distance, isLoading: false})
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1); 
    var a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  showMenu = (option) => {
    this.setState({isMenu: option})
  }

  otherPreviewImage = (id) => {
    this.setState({ hoveredProductId: id });
  }

  backToMainProductImage = () => {
    this.setState({ hoveredProductId: '' });
  }

  changeMainButton = (hoveredItem) => {
    this.setState({ mainButton: hoveredItem })
  }

  mainButtonBack = () => {
    this.setState({ mainButton: "" })
  }

  revealText = (option) => {
    this.setState({ text: option })
  }

  render() {
    const {viewport} = this.state
    const {category, gender} = this.props.match.params
    return (
      <>
        <div className="second-hand-page categorized">
          <style>
            {'\
          .basket-icon-wrapper{\
            display: none;\
          }\
          .navbar{\
            display: none;\
          }\
          .second-hand-navbar{\
            display: flex;\
          }\
          '}
          </style>

          <div className="categories-container" onMouseLeave={() =>{
            this.showMenu(null)
          }}>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("women")
            }}>

              <Link to="/second-hand/all/women"><div className="menu-category-header">Women</div></Link>

              {this.state.isMenu === "women" &&
              <>
                <Link to="/second-hand/dresses/women"><div className="menu-item">Dresses</div></Link>
                <Link to="/second-hand/skirts/women"><div className="menu-item">Skirts</div></Link>
                <Link to="/second-hand/tops/women"><div className="menu-item">Tops</div></Link>
                <Link to="/second-hand/t-shirts/women"><div className="menu-item">T-Shirts</div></Link>
                <Link to="/second-hand/hoodies/women"><div className="menu-item">Hoodies</div></Link>
                <Link to="/second-hand/pants/women"><div className="menu-item">Pants</div></Link>
                <Link to="/second-hand/shoes/women"><div className="menu-item">Shoes</div></Link>
                <Link to="/second-hand/jackets/women"><div className="menu-item">Jackets</div></Link>
                <Link to="/second-hand/shorts/women"><div className="menu-item">Shorts</div></Link>
                <Link to="/second-hand/sweaters/women"><div className="menu-item">Sweaters</div></Link>
                <Link to="/second-hand/others/women"><div className="menu-item">Others</div></Link>
              </>
              }

            </div>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("men")
            }}>

              <Link to="/second-hand/all/men"><div className="menu-category-header">Men</div></Link>

              {this.state.isMenu === "men" &&
              <>
                <Link to="/second-hand/t-shirts/men"><div className="menu-item">T-Shirts</div></Link>
                <Link to="/second-hand/hoodies/men"><div className="menu-item">Hoodies</div></Link>
                <Link to="/second-hand/pants/men"><div className="menu-item">Pants</div></Link>
                <Link to="/second-hand/shoes/men"><div className="menu-item">Shoes</div></Link>
                <Link to="/second-hand/jackets/men"><div className="menu-item">Jackets</div></Link>
                <Link to="/second-hand/shorts/men"><div className="menu-item">Shorts</div></Link>
                <Link to="/second-hand/sweaters/men"><div className="menu-item">Sweaters</div></Link>
                <Link to="/second-hand/others/men"><div className="menu-item">Others</div></Link>
              </>
              }

            </div>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("uni")
            }}>
              
              <Link to="/second-hand/all/uni"><div className="menu-category-header">Uni</div></Link>

              {this.state.isMenu === "uni" &&
              <>
                <Link to="/second-hand/t-shirts/uni"><div className="menu-item">T-Shirts</div></Link>
                <Link to="/second-hand/hoodies/uni"><div className="menu-item">Hoodies</div></Link>
                <Link to="/second-hand/pants/uni"><div className="menu-item">Pants</div></Link>
                <Link to="/second-hand/shoes/uni"><div className="menu-item">Shoes</div></Link>
                <Link to="/second-hand/jackets/uni"><div className="menu-item">Jackets</div></Link>
                <Link to="/second-hand/shorts/uni"><div className="menu-item">Shorts</div></Link>
                <Link to="/second-hand/sweaters/uni"><div className="menu-item">Sweaters</div></Link>
                <Link to="/second-hand/dresses/women"><div className="menu-item">Dresses</div></Link>
                <Link to="/second-hand/skirts/women"><div className="menu-item">Skirts</div></Link>
                <Link to="/second-hand/tops/women"><div className="menu-item">Tops</div></Link>
                <Link to="/second-hand/others/uni"><div className="menu-item">Others</div></Link>
              </>
              }

            </div>

          </div>

          <div className="adress-input-wrapper">
            
            <form className="navbar-search">
              <Geocoder
                {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
                queryParams={queryParams} initialViewState={{
                  zoom: 30.5,
                }}
                inputComponent={MyInput}
              />
            </form>

            {this.state.placeName &&
            <div className="place-distance-wrapper">

              <div className="place-wrapper">
                <img src="https://res.cloudinary.com/nuhippies/image/upload/v1663281183/Nu%20Hippies/icons/pin_glwy25.png" />
                {this.state.placeName}
              </div>  

              <div className="distance-input">
              Distance in miles:
                <select onChange={this.handleDistance}>
                  <option>1</option>
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option selected>100</option>
                  <option>500</option>
                  <option>Whole Country</option>
                </select>
              </div>
            </div>
            }

          </div>

          <div className="product-container">

            {this.state.isLoading &&
        <img className="products-loading" src="https://res.cloudinary.com/nuhippies/image/upload/v1651162892/Nu%20Hippies/icons/output-onlinegiftools_2_y18upn.gif" />
            }

            {!this.state.isLoading &&
  <>
    {this.state.items.slice(0, this.state.productsShowed).map(item => {

      if ((item.category.toLowerCase() !== category.toLowerCase() && category.toLowerCase() !== "all") ||
      (item.gender.toLowerCase() !== gender.toLowerCase() && gender.toLowerCase() !== "all")){
        return
      }

      const newName = item.title.replace(/ /g, '-')

      return <Link to={`/second-hand/items/${newName}/${item._id}`} title={item.title} key={item._id}>
        <div className="product-wrapper" onMouseEnter={() => {
          this.otherPreviewImage(item._id);
        }}
        onMouseLeave={this.backToMainProductImage}>
          <div className="product-preview-image"
            style={{ backgroundImage: `url(${this.state.hoveredProductId === item._id && item.images[1] ? item.images[1] : item.images[0]})` }}>
          </div>
          <div className="product-preview-name">{item.title}</div>
          <div className="product-preview-price-wrapper">
            <div className="product-preview-price">£{item.price}</div>
          </div>
        </div>
      </Link>;
    })}
  </>
            }
          </div>

        </div>
      </>
    );
  }
}

export default CategorizedItems