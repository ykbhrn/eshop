import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../lib/api'

class CategoriziedProducts extends React.Component {
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
    const {subcategory, gender, type} = this.props.match.params
    return (
      <div className="products-page categorized">
        <div className="cat-nav">
          <Link className="cat-nav-item" to={`/products/${subcategory}/uni/all`}>          
            <div>{subcategory}</div>
          </Link>
          {gender !== "uni" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${gender}/all`}> 
            <div><span className="symbol">&#62;</span>{gender}</div>
          </Link>
          }
          {type !== "all" &&
          <Link className="cat-nav-item" to={`/products/${subcategory}/${gender}/${type}`}> 
            <div><span className="symbol">&#62;</span>{type}</div>
          </Link>
          }
        </div>
        <div className="product-container">
          {this.state.products.slice(0).reverse().map(product => {
            if ((!product.categories.types.includes(type) && type !== "all") || (product.categories.gender !== gender && gender !== "uni")){
              return
            }

            return <Link to={`/products/${product._id}`} key={product._id}>
              <div className="product-wrapper" onMouseEnter={() => {
                this.otherPreviewImage(product._id);
              }}
              onMouseLeave={this.backToMainProductImage}>
                <div className="product-preview-image"
                  style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.images[0].images[1] : product.images[0].images[0]})` }}>
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


export default CategoriziedProducts