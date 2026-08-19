import React from 'react';
import { Link } from 'react-router-dom';
import { getAllUsedItems, updateUserAccount, getMyProfile } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'
import Geocoder from 'react-mapbox-gl-geocoder'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';
import SecondHandMap from './SecondHandMap'
import { mapAccess } from '../../lib/mapbox'

const queryParams = {
  country: 'gb'
}

const MyInput = (props) => <input {...props} placeholder="Add your postcode or address" />

class UsedItems extends React.Component {
  state = {
    items: [],
    hoveredProductId: '',
    text: null,
    isLoading: false,
    viewport: {},
    placeName: false,
    coordinates: [],
    distance: 100
  }

  async componentDidMount() {
    try {
      this.setState({isLoading: true})
      window.scrollTo(0, 0)

      seo({
        title: "NHM Second Hand",
        metaDescription: {mainMetaDescription}
      });

      const res = await getAllUsedItems();

      // Restore a previously chosen address so the map is populated on arrival:
      // from the account when signed in, otherwise from localStorage.
      if (isAuthenticated()) {
        const profile = await getMyProfile()

        if (profile.data.preferenceCoordinates && profile.data.preferenceCoordinates.length === 2) {
          const coords = profile.data.preferenceCoordinates
          const miles = profile.data.preferenceDistance ? profile.data.preferenceDistance : 100

          this.setState({
            items: this.filterByDistance(res.data, coords, miles).reverse(),
            isLoading: false,
            placeName: profile.data.preferencePlaceName ? profile.data.preferencePlaceName : false,
            coordinates: coords,
            distance: miles
          })
          return
        }

      } else if (localStorage.getItem('coordinates')) {
        const coords = JSON.parse(localStorage.getItem('coordinates'))
        const miles = Number(localStorage.getItem('distance')) ? Number(localStorage.getItem('distance')) : 100

        this.setState({
          items: this.filterByDistance(res.data, coords, miles).reverse(),
          isLoading: false,
          placeName: localStorage.getItem('placeName') ? localStorage.getItem('placeName') : false,
          coordinates: coords,
          distance: miles
        })
        return
      }

      this.setState({ items: res.data.reverse(), isLoading: false });

    } catch (err) {
      console.log(err)
    }
  }

  // miles -> km, matching the category pages
  filterByDistance = (products, coordinates, miles) => {
    const km = Number(miles) * 1.60934
    return products.filter(product => (
      Array.isArray(product.coordinates) && product.coordinates.length === 2 &&
      this.getDistanceFromLatLonInKm(coordinates[1], coordinates[0], product.coordinates[1], product.coordinates[0]) < km
    ))
  }

  onSelected = async (viewport, item) => {
    try {
      this.setState({ isLoading: true })

      const res = await getAllUsedItems()
      const coords = [item.center[0], item.center[1]]

      if (isAuthenticated()) {
        await updateUserAccount({ preferenceCoordinates: coords, preferencePlaceName: item.place_name })
      } else {
        localStorage.setItem('coordinates', JSON.stringify(coords))
        localStorage.setItem('placeName', item.place_name)
      }

      this.setState({
        items: this.filterByDistance(res.data, coords, this.state.distance).reverse(),
        viewport,
        placeName: item.place_name,
        coordinates: coords,
        isLoading: false
      })
    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  }

  handleDistance = async (event) => {
    try {
      this.setState({ isLoading: true })

      const miles = Number(event.target.value)
      const res = await getAllUsedItems()

      if (isAuthenticated()) {
        await updateUserAccount({ preferenceDistance: miles })
      } else {
        localStorage.setItem('distance', miles)
      }

      this.setState({
        items: this.filterByDistance(res.data, this.state.coordinates, miles).reverse(),
        distance: miles,
        isLoading: false
      })
    } catch (err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  deg2rad = (deg) => {
    return deg * (Math.PI / 180)
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
    return (
      <>
        <SecondHandNavbar /> 
      
        <div className="second-hand-page">
          <style>
            {'\
          .slogan-header{\
            display: none;\
          }\
          '}
          </style>

          <h1>Make Fashion Slow Again</h1>

          {this.state.isLoading &&
        <img className="products-loading" src="https://res.cloudinary.com/nuhippies/image/upload/v1651162892/Nu%20Hippies/icons/output-onlinegiftools_2_y18upn.gif" />
          }

          {!this.state.isLoading &&
  <>

    <div className="icon-container">

      <Link to="/second-hand/t-shirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons first"></div>
          <div className="icon-description">T-shirts</div>
        </div>
      </Link>
            
      <Link to="/second-hand/hoodies/all">
        <div className="icon-wrapper">
          <div className="sh-icons second"></div>
          <div className="icon-description">Hoodies</div>
        </div>
      </Link>

      <Link to="/second-hand/dresses/all">
        <div className="icon-wrapper">
          <div className="sh-icons third"></div>
          <div className="icon-description">Dresses</div>
        </div>
      </Link>

      <Link to="/second-hand/skirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons fourth"></div>
          <div className="icon-description">Skirts</div>
        </div>
      </Link>

      <Link to="/second-hand/pants/all">
        <div className="icon-wrapper">
          <div className="sh-icons fifth"></div>
          <div className="icon-description">Pants</div>
        </div>
      </Link>

      <Link to="/second-hand/shoes/all">
        <div className="icon-wrapper">
          <div className="sh-icons sixth"></div>
          <div className="icon-description">Shoes</div>
        </div>
      </Link>

      <Link to="/second-hand/jackets/all">
        <div className="icon-wrapper">
          <div className="sh-icons seventh"></div>
          <div className="icon-description">Jackets</div>
        </div>
      </Link>

      <Link to="/second-hand/shorts/all">
        <div className="icon-wrapper">
          <div className="sh-icons eighth"></div>
          <div className="icon-description">Shorts</div>
        </div>
      </Link>

      <Link to="/second-hand/sweaters/all">
        <div className="icon-wrapper">
          <div className="sh-icons ninth"></div>
          <div className="icon-description">Sweaters</div>
        </div>
      </Link>

      <Link to="/second-hand/sweatshirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons tenth"></div>
          <div className="icon-description">Sweatshirts</div>
        </div>
      </Link>

      <Link to="/second-hand/shirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons eleventh"></div>
          <div className="icon-description">Shirts</div>
        </div>
      </Link>

      <Link to="/second-hand/others/all">
        <div className="icon-wrapper">
          <div className="sh-icons twelfth"></div>
          <div className="icon-description">Others</div>
        </div>
      </Link>
            
    </div>

  </>
          }

          <div className="adress-input-wrapper">

            <form className="navbar-search">
              <Geocoder
                {...mapAccess} onSelected={this.onSelected} viewport={this.state.viewport} hideOnSelect={true}
                queryParams={queryParams} initialViewState={{
                  zoom: 30.5,
                }}
                inputComponent={MyInput}
              />
            </form>

            {this.state.placeName &&
            <div className="place-distance-wrapper">

              <div className="place-wrapper">
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%202c-3.9%200-7%203.1-7%207%200%205.2%207%2013%207%2013s7-7.8%207-13c0-3.9-3.1-7-7-7z%27%20fill%3D%27%23474747%27%2F%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%279%27%20r%3D%272.6%27%20fill%3D%27%23FACB52%27%2F%3E%3C%2Fsvg%3E" />
                {this.state.placeName}
              </div>

              <div className="distance-input">
              Distance in miles:
                <select onChange={this.handleDistance} value={this.state.distance}>
                  <option value={1}>1</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={500}>500</option>
                  <option value={1000000}>Everything</option>
                </select>
              </div>

              <SecondHandMap
                items={this.state.items}
                coordinates={this.state.coordinates}
                viewport={this.state.viewport}
                placeName={this.state.placeName}
                height={320}
                onViewportChange={(newViewport) => this.setState({ viewport: newViewport })}
              />
            </div>
            }

          </div>

          <div className="product-container">
            {this.state.items.slice(0, this.state.productsShowed).map(item => {

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
          </div>

          
        </div>
      </>
    );
  }
}

export default UsedItems