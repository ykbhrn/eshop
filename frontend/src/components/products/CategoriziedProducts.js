import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'
import {seo} from '../../lib/functions'
import Navbar from '../common/Navbar';

class CategoriziedProducts extends React.Component {
  state = {
    products: [],
    searchProducts: [],
    isSearching: false,
    searchedPhrase: null,
    flowerProductsOne: [],
    flowerProductsTwo: [],
    hoveredProductId: '',
    productsShowed: 10,
    isLoading: false
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true })

      if (this.props.match.params.subcategory === "supplements") {
        seo({
          title: "Top quality, natural supplements | Nu Hippies",
          metaDescription: "Natural nutritional supplements of top quality to improve your energy, focus, digestion, and overall health"
        });
      } else if (this.props.match.params.subcategory === "accessories") {
        seo({
          title: "Fairtrade, eco-friendly accessories | Nu Hippies",
          metaDescription: "Fairtrade and eco-friendly accessories from small family businesses"
        });
      }

      window.scrollTo(0, 0)
      const res = await getAllProducts();
      this.setState({ products: res.data.reverse(), isLoading: false });
      this.renderingFlowers();
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = (event) => {

    event.preventDefault()

    const wordSearch = this.state.products.filter(result => {

      const searchValue = event.target.value.toLowerCase()
      const productSearch = result.name.toLowerCase()

      if (productSearch.includes(searchValue)){
        return productSearch 
      }

    })

    const searchArray = event.target.value.split('')

    if (searchArray.length > 0) {
      return  this.setState({ searchProducts: wordSearch, searchedPhrase: event.target.value.split('').length })
    } else {
      this.setState({ searchProducts: wordSearch, searchedPhrase: event.target.value.split('').length })
    }
  }

  handleClick = (event) => {
    
    if (event.target.name === "search") {
      this.setState({ isSearching: true })
    } else {
      this.setState({ isSearching: false })
    }
  }

  otherPreviewImage = (id) => {
    this.setState({ hoveredProductId: id });
  }

  backToMainProductImage = () => {
    this.setState({ hoveredProductId: '' });
  }

  renderingFlowers = () => {
    const newProductsArrayOne = [];
    const newProductsArrayTwo = [];
    const randomNumberArray = [];

    if (this.state.products.length > 0) {
      for (let i = 0; i < 6; i++) {
        const randomNumber = Math.floor(Math.random() * this.state.products.length);
        if (randomNumberArray.includes(randomNumber)) {
          i--;
        } else {
          i < 3 ? newProductsArrayOne.push(this.state.products[randomNumber]) : newProductsArrayTwo.push(this.state.products[randomNumber]);
          randomNumberArray.push(randomNumber);
        }
      }
    }

    this.setState({ flowerProductsOne: newProductsArrayOne, flowerProductsTwo: newProductsArrayTwo });
  }

  showMore = () => {
    this.setState({ productsShowed: this.state.productsShowed + 10 })
  }

  render() {
    const {subcategory, typeOne, typeTwo, typeThree} = this.props.match.params
    return (
      <>
        <Navbar />
        <div className="products-page categorized change-brightness" onClick={this.handleClick}>

          <style>
            {'\
          .basket-icon-wrapper{\
            display: flex;\
          }\
          '}
          </style>

          {this.state.isLoading &&
        <img className="products-loading" src="https://res.cloudinary.com/nuhippies/image/upload/v1651162892/Nu%20Hippies/icons/output-onlinegiftools_2_y18upn.gif" />
          }

          {!this.state.isLoading &&
        <>
          <div className="products-banner">

            <h1 className="big-name-products">
            NU HIPPIES MOVEMENT
            </h1>

            <div className="products-side-slogan">
              <h2>
              Bring Hippies Back
              </h2>
            </div>

            <img src={`${subcategory === "supplements" ? "https://res.cloudinary.com/nuhippies/image/upload/v1651188458/Nu%20Hippies/icons/vitamins-26622_1280_cfesp6.png" : "https://res.cloudinary.com/nuhippies/image/upload/v1651188323/Nu%20Hippies/icons/pngtree-pop-style-character-accessories-bag-retro-straw-bag-accessories-png-image_374950-removebg-preview_jk2srn.png"}`} />

          </div>
  
          <div className="search-wrapper">
          
            <form>
              <input 
                type="search" 
                id=""
                name="search"
                placeholder="search"
                onChange={this.handleChange}
                onClick={this.handleClick} 
              />
            </form>
      
            <div className="search-results-container">
      
              {(this.state.searchedPhrase > 2 && this.state.isSearching) &&
            <>
              {this.state.searchProducts.map(product => {
      
                const newName = product.name.replace(/ /g, '-')
      
                return <Link to={`/products/${newName}/${product._id}`} key={product._id}>
                  <div className="search-result-wrapper">
                    <div className="search-result-name">{product.name}</div>
                    <img src={product.images[0].images[0]} />
                  </div>
                </Link>
              })}
            </>
              }
      
            </div>
      
          </div>

          <div className="cat-nav">

            <Link className="cat-nav-item" to={`/products`} title="All Products">          
              <div>products</div>
            </Link>

            <Link className="cat-nav-item" to={`/products/${subcategory}/all/all/all`} title={subcategory}>          
              <div><span className="symbol">&#62;</span> {subcategory}</div>
            </Link>

            {typeOne !== "uni" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/all/all`} title={typeOne}> 
            <div><span className="symbol">&#62;</span>{typeOne}</div>
          </Link>
            }

            {typeTwo !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}all`} title={typeTwo}> 
            <div><span className="symbol">&#62;</span>{typeTwo}</div>
          </Link>
            }

            {typeThree !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${typeOne}/${typeTwo}/${typeThree}`} title={typeThree}> 
            <div><span className="symbol">&#62;</span>{typeThree}</div>
          </Link>
            }

          </div>

          <div className="products-flower-wrapper">

            <div className="flower-container one">
              {this.state.flowerProductsOne.map(product => {

                const newName = product.name.replace(/ /g, '-')

                return <a href={`/products/${newName}/${product._id}`} title={product.name} key={product._id}>
                  <div className="flower-content">
                    <div className="flower">
                      <img alt={product.name} src={product.images[0].images[0]} className="flowerProductImage" />
                      <div className="big-petal big-petal1"></div>
                      <div className="big-petal big-petal2"></div>
                      <div className="big-petal big-petal3"></div>
                      <div className="big-petal big-petal4"></div>
                      <div className="small-petal small-petal1"></div>
                      <div className="small-petal small-petal2"></div>
                      <div className="small-petal small-petal3"></div>
                      <div className="small-petal small-petal4"></div>
                      <div className="small-petal small-petal5"></div>
                      <div className="small-petal small-petal6"></div>
                      <div className="small-petal small-petal7"></div>
                      <div className="small-petal small-petal8"></div>
                    </div>
                  </div>
                </a>
              })}
            </div>

            <div className="container-more-wrapper">

              <div className="product-container">
                {this.state.products.slice(0).map(product => {

                  if ((!product.categories.types.includes(typeOne) && typeOne !== "all") ||
              (!product.categories.types.includes(typeTwo) && typeTwo !== "all") || 
              (!product.categories.types.includes(typeThree) && typeThree !== "all") ||
              (product.categories.subCategory !== subcategory && subcategory !== "all") ){
                    return
                  }

                  const newName = product.name.replace(/ /g, '-')

                  return <Link to={`/products/${newName}/${product._id}`} title={product.name} key={product._id}>
                    <div className="product-wrapper" onMouseEnter={() => {
                      this.otherPreviewImage(product._id);
                    }}
                    onMouseLeave={this.backToMainProductImage}>
                      <div className="product-preview-image"
                        style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id && product.images[0].images[1] ? product.images[0].images[1] : product.images[0].images[0]})` }}>
                      </div>
                      <div className="product-preview-name">{product.name}</div>
                      <div className="product-preview-price-wrapper">
                        <div className="product-preview-price">£{product.price / 100}</div>
                        {product.discount &&
                    <div className="product-preview-discount">-{product.discount}%</div>
                        }
                      </div>
                    </div>
                  </Link>
                })}
              </div>

              {/* <div className="more" onClick={this.showMore}>Show More <i className="fa-solid fa-caret-down"></i></div> */}
          
            </div>

            <div className="flower-container two">
              {this.state.flowerProductsTwo.map(product => {

                const newName = product.name.replace(/ /g, '-')

                return <a href={`/products/${newName}/${product._id}`} title={product.name} key={product._id}>
                  <div className="flower-content">
                    <div className="flower">
                      <img src={product.images[0].images[0]} alt={product.name} className="flowerProductImage" />
                      <div className="big-petal big-petal1"></div>
                      <div className="big-petal big-petal2"></div>
                      <div className="big-petal big-petal3"></div>
                      <div className="big-petal big-petal4"></div>
                      <div className="small-petal small-petal1"></div>
                      <div className="small-petal small-petal2"></div>
                      <div className="small-petal small-petal3"></div>
                      <div className="small-petal small-petal4"></div>
                      <div className="small-petal small-petal5"></div>
                      <div className="small-petal small-petal6"></div>
                      <div className="small-petal small-petal7"></div>
                      <div className="small-petal small-petal8"></div>
                    </div>
                  </div>
                </a>
              })}
            </div>
          </div>
        </>
          }

        </div>
      </>
    );
  }
}


export default CategoriziedProducts