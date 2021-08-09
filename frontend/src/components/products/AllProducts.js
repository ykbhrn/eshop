import React from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../../lib/api'

class AllProducts extends React.Component {
  state = {
    products: [],
    hoveredProductId: ''
  }

  async componentDidMount() {
    try {
      const res = await getAllProducts()
      this.setState({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  otherPreviewImage = (id) => {
    setTimeout(() => {
      this.setState({ hoveredProductId: id })
    }, 295);
  }

  backToMainProductImage = () => {
    this.setState({ hoveredProductId: '' })
  }

  render() {
    return (
      <div className="products-section">
        <div className="product-container">
          {this.state.products.slice(0).reverse().map(product => {
            return <div className="product-wrapper" onMouseEnter={() => {
              this.otherPreviewImage(product._id)
            }}
            onMouseLeave={this.backToMainProductImage} key={product._id}>{product.name}
              <div className="product-preview-image"
                style={{ backgroundImage: `url(${this.state.hoveredProductId === product._id ? product.otherImages[0] : product.mainImage})` }}>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}


export default AllProducts