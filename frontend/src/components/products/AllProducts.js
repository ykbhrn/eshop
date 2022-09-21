import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'
import {seo} from '../../lib/functions'

class AllProducts extends React.Component {
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
      
      seo({
        title: "All products | Nu Hippies",
        metaDescription: "Fairtrade, eco-friendly accessories from small family businesses, and natural nutritional supplements of top quality."
      });

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
    console.log(event.target)
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

  handleScroll = (event) => {
    console.log("im here", event)
  }

  showMore = () => {
    this.setState({ productsShowed: this.state.productsShowed + 10 })
  }

  render() {

    if (!this.state.products) return null
    console.log(this.state.isSearching)
    return (
      <div className="products-page change-brightness" onClick={this.handleClick}>

        <style>
          {'\
          .donation-icon{\
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
    {/* <img id="van-moving" src="https://res.cloudinary.com/nuhippies/image/upload/v1646177431/Nu%20Hippies/Backgrounds/pngwing.com_1_ldwbgp.png" /> */}
          
    <div className="products-side-slogan">

      <h2>
        Bring Hippies Back
      </h2>

    </div>

    <div className="products-category-wrapper">

      <Link className="products-category-item" to="/products/accessories/all/all/all">
        <div className="products-category-item-name">Accessories</div>
        <div className="products-category-item-background-one"></div>
      </Link>

      <Link className="products-category-item" to="/products/supplements/all/all/all">
        <div className="products-category-item-name">Supplements</div>
        <div className="products-category-item-background-two"></div>
      </Link>

    </div>

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

          const newName = product.name.replaceAll(' ', '-');

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

  <div className="products-flower-wrapper">

    <div className="flower-container one" onScroll={this.handleScroll}>
      {this.state.flowerProductsOne.map(product => {

        const newName = product.name.replaceAll(' ', '-');

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
        {this.state.products.slice(0, this.state.productsShowed).map(product => {

          const newName = product.name.replaceAll(' ', '-');

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
          </Link>;
        })}
      </div>

      <div className="more" onClick={this.showMore}>Show More <i className="fa-solid fa-caret-down"></i></div>

    </div>

    <div className="flower-container two" onScroll={this.handleScroll}>
      {this.state.flowerProductsTwo.map(product => {
        
        const newName = product.name.replaceAll(' ', '-');
        
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

  </div>
</>
        }

      </div>
    );
  }
}


export default AllProducts;