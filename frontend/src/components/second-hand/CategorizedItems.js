import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
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

class CategorizedItems extends React.Component {
  state = {
    products: [],
    hoveredProductId: '',
    text: null,
    viewport: {},
    isMenu: null
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "NHM Second Hand",
        metaDescription: {mainMetaDescription}
      });

      const res = await getAllProducts();
      this.setState({ products: res.data.reverse(), isLoading: false });

    } catch (err) {
      console.log(err)
    }
  }

  onSelected = (viewport, item) => {
    this.setState({viewport});
    console.log('Selected: ', item)
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

          <h1 className="categorized-header">Make Fashion <br /> Slow Again</h1>

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
                <Link to="/second-hand/others/uni"><div className="menu-item">Others</div></Link>
              </>
              }

            </div>

          </div>

          <form className="navbar-search">
            <Geocoder
              {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
              queryParams={queryParams} initialViewState={{
                zoom: 30.5,
              }}
              placeholder={"add your postcode"}
            />
          </form>

          <div className="product-container">
            {this.state.products.slice(0, this.state.productsShowed).map(product => {

              const newName = product.name.replaceAll(' ', '-');

              return <Link to={`/products/${newName}/${product._id}`} title={product.name} key={product._id}>
                <div className="product-wrapper" onMouseEnter={() => {
                  this.otherPreviewImage(product._id);
                }}
                onMouseLeave={this.backToMainProductImage}>
                  <div className="product-preview-image"
                    style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.images[0].images[1] : product.images[0].images[0]})` }}>
                  </div>
                  <div className="product-preview-name">{product.name}</div>
                  <div className="product-preview-price-wrapper">
                    <div className="product-preview-price">£{product.price / 100}</div>
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

export default CategorizedItems