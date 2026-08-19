import React from 'react';
import { Link } from 'react-router-dom';
import { getAllUsedItems, updateUserAccount, getMyProfile } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'
import Geocoder from 'react-mapbox-gl-geocoder'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

const mapAccess = {
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN
}

const mapStyle = {
  width: '100%',
  height: 600
}

const queryParams = {
  country: 'gb'
}

const MyInput = (props) => <input {...props} placeholder="Add your postcode or address" />


class CategorizedItems extends React.Component {
  state = {
    items: [],
    hoveredProductId: '',
    text: null,
    viewport: {},
    isMenu: null,
    placeName: false,
    coordinates: [],
    distance: 100,
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

      if (isAuthenticated()) {

        const resTwo = await getMyProfile()

        if (resTwo.data.preferenceCoordinates) {

          const filteredProducts = res.data.filter(product => {
            if (this.getDistanceFromLatLonInKm(resTwo.data.preferenceCoordinates[1], resTwo.data.preferenceCoordinates[0], product.coordinates[1], product.coordinates[0]) < resTwo.data.preferenceDistance ? resTwo.data.preferenceDistance : 100) {
              return product
            }
          })

          this.setState({ items: filteredProducts.reverse(), isLoading: false, placeName: resTwo.data.preferencePlaceName ? resTwo.data.preferencePlaceName : false, 
            coordinates: resTwo.data.preferenceCoordinates ? resTwo.data.preferenceCoordinates : [],
            distance: resTwo.data.preferenceDistance ? resTwo.data.preferenceDistance : 100
          });

        } else {

          this.setState({ items: res.data.reverse(), isLoading: false });

        }


      } else {

        if (localStorage.getItem("coordinates")) {

          const coord = JSON.parse(localStorage.getItem("coordinates"))

          const filteredProducts = res.data.filter(product => {
            if (this.getDistanceFromLatLonInKm(coord[1], coord[0], product.coordinates[1], product.coordinates[0]) < Number(localStorage.getItem("distance")) ? Number(localStorage.getItem("distance")) : 100) {
              return product
            }
          })
        
          this.setState({ items: filteredProducts.reverse(), isLoading: false, placeName: localStorage.getItem("placeName") ? localStorage.getItem("placeName") : false, 
            coordinates: coord ? coord : [],
            distance: Number(localStorage.getItem("distance")) ? Number(localStorage.getItem("distance")) : 100
          });

        } else {
          this.setState({ items: res.data.reverse(), isLoading: false });
        }
        
      }

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

      const arr = [item.center[0], item.center[1]]
      localStorage.setItem('coordinates', JSON.stringify(arr))
      localStorage.setItem('placeName', item.place_name)
    }

    const filteredProducts = res.data.filter(product => {
      if (this.getDistanceFromLatLonInKm(item.center[1], item.center[0], product.coordinates[1], product.coordinates[0]) < this.state.distance * 1.60934) {
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
      const som = await updateUserAccount({preferenceDistance: Number(event.target.value)})

    } else {
      localStorage.setItem('distance', Number(event.target.value))
    }

    const filteredProducts = res.data.filter(product => {

      if (this.getDistanceFromLatLonInKm(this.state.coordinates[1], this.state.coordinates[0], product.coordinates[1], product.coordinates[0]) < distance) {
        return product
      }
      
    })

    this.setState({items: filteredProducts.reverse(), distance: Number(event.target.value), isLoading: false})
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
    if (!this.state.items) return null
    return (
      <>
        <SecondHandNavbar /> 
      
        <div className="second-hand-page categorized">

          <div className="categories-container" onMouseLeave={() =>{
            this.showMenu(null)
          }}>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("women")
            }}>

              <Link to="/second-hand/all/women" onClick={() =>{
                this.showMenu(null)
              }}><div className="menu-category-header">Women</div></Link>

              {this.state.isMenu === "women" &&
              <>
                <Link to="/second-hand/dresses/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Dresses</div>
                </Link>

                <Link to="/second-hand/skirts/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Skirts</div>
                </Link>

                <Link to="/second-hand/tops/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Tops</div>
                </Link>

                <Link to="/second-hand/t-shirts/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">T-Shirts</div>
                </Link>

                <Link to="/second-hand/hoodies/women"onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Hoodies</div>
                </Link>

                <Link to="/second-hand/pants/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Pants</div>
                </Link>

                <Link to="/second-hand/shoes/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shoes</div>
                </Link>

                <Link to="/second-hand/jackets/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Jackets</div>
                </Link>

                <Link to="/second-hand/shorts/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shorts</div>
                </Link>

                <Link to="/second-hand/sweaters/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Sweaters</div>
                </Link>

                <Link to="/second-hand/others/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Others</div>
                </Link>
              </>
              }

            </div>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("men")
            }}>

              <Link to="/second-hand/all/men" onClick={() =>{
                this.showMenu(null)
              }}><div className="menu-category-header">Men</div>
              </Link>

              {this.state.isMenu === "men" &&
              <>
                <Link to="/second-hand/t-shirts/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">T-Shirts</div>
                </Link>

                <Link to="/second-hand/hoodies/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Hoodies</div>
                </Link>

                <Link to="/second-hand/pants/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Pants</div>
                </Link>

                <Link to="/second-hand/shoes/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shoes</div>
                </Link>

                <Link to="/second-hand/jackets/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Jackets</div>
                </Link>

                <Link to="/second-hand/shorts/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shorts</div>
                </Link>

                <Link to="/second-hand/sweaters/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Sweaters</div>
                </Link>

                <Link to="/second-hand/others/men" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Others</div>
                </Link>
              </>
              }

            </div>

            <div className="menu-category" onMouseEnter={() =>{
              this.showMenu("uni")
            }}>
              
              <Link to="/second-hand/all/uni" onClick={() =>{
                this.showMenu(null)
              }}><div className="menu-category-header">Uni</div>
              </Link>

              {this.state.isMenu === "uni" &&
              <>
                <Link to="/second-hand/t-shirts/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">T-Shirts</div>
                </Link>

                <Link to="/second-hand/hoodies/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Hoodies</div>
                </Link>

                <Link to="/second-hand/pants/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Pants</div>
                </Link>

                <Link to="/second-hand/shoes/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shoes</div>
                </Link>

                <Link to="/second-hand/jackets/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Jackets</div>
                </Link>

                <Link to="/second-hand/shorts/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Shorts</div>
                </Link>

                <Link to="/second-hand/sweaters/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Sweaters</div>
                </Link>

                <Link to="/second-hand/dresses/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Dresses</div>
                </Link>

                <Link to="/second-hand/skirts/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Skirts</div>
                </Link>

                <Link to="/second-hand/tops/women" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Tops</div>
                </Link>

                <Link to="/second-hand/others/uni" onClick={() =>{
                  this.showMenu(null)
                }}><div className="menu-item">Others</div>
                </Link>
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
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27M12%202c-3.9%200-7%203.1-7%207%200%205.2%207%2013%207%2013s7-7.8%207-13c0-3.9-3.1-7-7-7z%27%20fill%3D%27%23474747%27%2F%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%279%27%20r%3D%272.6%27%20fill%3D%27%23FACB52%27%2F%3E%3C%2Fsvg%3E" />
                {this.state.placeName}
              </div>  

              <div className="distance-input">
              Distance in miles:
                <select onChange={this.handleDistance}>
                  {this.state.distance === 1 ? <option selected>1</option> : <option>1</option>}
                  {this.state.distance === 3 ? <option selected>3</option> : <option>3</option>}
                  {this.state.distance === 5 ? <option selected>5</option> : <option>5</option>}
                  {this.state.distance === 10 ? <option selected>10</option> : <option>10</option>}
                  {this.state.distance === 25 ? <option selected>25</option> : <option>25</option>}
                  {this.state.distance === 50 ? <option selected>50</option> : <option>50</option>}
                  {this.state.distance === 100 ? <option selected>100</option> : <option>100</option>}
                  {this.state.distance === 500 ? <option selected>500</option> : <option>500</option>}
                  {this.state.distance === 1000000 ? <option selected value="1000000">Everything</option> : <option value="1000000">Everything</option>}
                </select>
              </div>
            </div>
            }

          </div>

          <div className="cat-nav">

            <Link className="cat-nav-item" to={`/second-hand`} title="All Products">          
              <div>all items</div>
            </Link>

            <Link className="cat-nav-item" to={`/second-hand/${category}/${gender}`} title={gender + " " + category}>          
              <div><span className="symbol">&#62;</span> {gender + " " + category}</div>
            </Link>

            {/* {gender !== "uni" && category !== "all" &&
          <Link className="cat-nav-item" to={`/second-hand/${category}/${gender}`} title={category + gender}> 
            <div><span className="symbol">&#62;</span>{gender + " " + category}</div>
          </Link>
            }

            {gender !== "uni" && category !== "all" &&
          <Link className="cat-nav-item" to={`/second-hand/${category}/${gender}`} title={category + gender}> 
            <div><span className="symbol">&#62;</span>{gender + " " + category}</div>
          </Link>
            } */}

            {/* {typeTwo !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}all`} title={typeTwo}> 
            <div><span className="symbol">&#62;</span>{typeTwo}</div>
          </Link>
            }

            {typeThree !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}/${typeThree}`} title={typeThree}> 
            <div><span className="symbol">&#62;</span>{typeThree}</div>
          </Link>
            } */}

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