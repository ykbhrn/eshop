import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'

class CategorizedItems extends React.Component {
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