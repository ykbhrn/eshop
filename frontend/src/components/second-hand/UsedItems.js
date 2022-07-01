import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'

class UsedItems extends React.Component {
  state = {
    products: [],
    hoveredProductId: '',
    text: null
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
        <div className="second-hand-page">
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

          <h1>Make Fashion Slow Again</h1>

          <div className="icon-container">

            <Link to="/second-hand/t-shirts/uni">
              <div className="icon-wrapper">
                <div className="first"></div>
                <div className="icon-description">T-shirts</div>
              </div>
            </Link>
            
            <Link to="/second-hand/hoodies/uni">
              <div className="icon-wrapper">
                <div className="second"></div>
                <div className="icon-description">Hoodies</div>
              </div>
            </Link>

            <Link to="/second-hand/dresses/uni">
              <div className="icon-wrapper">
                <div className="eleventh"></div>
                <div className="icon-description">Dresses</div>
              </div>
            </Link>

            <Link to="/second-hand/skirts/uni">
              <div className="icon-wrapper">
                <div className="twelfth"></div>
                <div className="icon-description">Skirts</div>
              </div>
            </Link>

            <Link to="/second-hand/pants/uni">
              <div className="icon-wrapper">
                <div className="third"></div>
                <div className="icon-description">Pants</div>
              </div>
            </Link>

            <Link to="/second-hand/shoes/uni">
              <div className="icon-wrapper">
                <div className="fourth"></div>
                <div className="icon-description">Shoes</div>
              </div>
            </Link>

            <Link to="/second-hand/jackets/uni">
              <div className="icon-wrapper">
                <div className="fifth"></div>
                <div className="icon-description">Jackets</div>
              </div>
            </Link>

            <Link to="/second-hand/shorts/uni">
              <div className="icon-wrapper">
                <div className="sixth"></div>
                <div className="icon-description">Shorts</div>
              </div>
            </Link>

            <Link to="/second-hand/sweaters/uni">
              <div className="icon-wrapper">
                <div className="seventh"></div>
                <div className="icon-description">Sweaters</div>
              </div>
            </Link>

            <Link to="/second-hand/sweatshirts/uni">
              <div className="icon-wrapper">
                <div className="eighth"></div>
                <div className="icon-description">Sweatshirts</div>
              </div>
            </Link>

            <Link to="/second-hand/shirts/uni">
              <div className="icon-wrapper">
                <div className="ninth"></div>
                <div className="icon-description">Shirts</div>
              </div>
            </Link>

            <Link to="/second-hand/others/uni">
              <div className="icon-wrapper">
                <div className="tenth"></div>
                <div className="icon-description">Others</div>
              </div>
            </Link>
            
          </div>

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

export default UsedItems