import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'

class AllProducts extends React.Component {
  state = {
    products: [],
    hoveredProductId: ''
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getAllProducts();
      this.setState({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  otherPreviewImage = (id) => {
    this.setState({ hoveredProductId: id });
  }

  backToMainProductImage = () => {
    this.setState({ hoveredProductId: '' });
  }

  render() {
    return (
      <div className="products-page">
        <div className="product-container">
          {this.state.products.slice(0).reverse().map(product => {
            return <Link to={`/products/${product._id}`} key={product._id}>
              <div className="product-wrapper" onMouseEnter={() => {
                this.otherPreviewImage(product._id);
              }}
              onMouseLeave={this.backToMainProductImage}>
                <div className="product-preview-image"
                  style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.images[1] : product.images[0]})` }}>
                </div>
                <div className="product-preview-name">{product.name}</div>
                <div className="product-preview-price-wrapper">
                  <div className="product-preview-price">£{product.price}</div>
                  {product.discount &&
                    <div className="product-preview-discount">-{product.discount}%</div>
                  }
                </div>
              </div>
            </Link>;
          })}
        </div>
      </div>
    );
  }
}


export default AllProducts;