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
      const discount = localStorage.getItem('discount')
      console.log(discount)
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
      <div className="change-brightness products-page">
        <div className="product-container change-brightness">
          {this.state.products.slice(0).reverse().map(product => {
            return <Link to={`/products/${product._id}`} key={product._id}>
              <div className="product-wrapper change-brightness" onMouseEnter={() => {
                this.otherPreviewImage(product._id);
              }}
              onMouseLeave={this.backToMainProductImage}>
                <div className="product-preview-image change-brightness"
                  style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.images[0].images[1] : product.images[0].images[0]})` }}>
                </div>
                <div className="product-preview-name change-brightness">{product.name}</div>
                <div className="product-preview-price-wrapper change-brightness">
                  <div className="product-preview-price change-brightness">£{product.price / 100}</div>
                  {product.discount &&
                    <div className="product-preview-discount change-brightness">-{product.discount}%</div>
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