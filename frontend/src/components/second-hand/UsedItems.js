import React from 'react';
import { Link } from 'react-router-dom';
import { getAllUsedItems } from '../../lib/api';
import { isAuthenticated } from '../../lib/auth';
import {seo, mainMetaDescription} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class UsedItems extends React.Component {
  state = {
    items: [],
    hoveredProductId: '',
    text: null,
    isLoading: false
  }

  async componentDidMount() {
    try {
      this.setState({isLoading: true})
      window.scrollTo(0, 0)

      seo({
        title: "NHM Second Hand",
        metaDescription: {mainMetaDescription}
      });

      const res = await getAllUsedItems();
      this.setState({ items: res.data.reverse(), isLoading: false });

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
        <SecondHandNavbar /> 
      
        <div className="second-hand-page">
          <style>
            {'\
          .slogan-header{\
            display: none;\
          }\
          '}
          </style>

          <h1>Make Fashion Slow Again</h1>

          {this.state.isLoading &&
        <img className="products-loading" src="https://res.cloudinary.com/nuhippies/image/upload/v1651162892/Nu%20Hippies/icons/output-onlinegiftools_2_y18upn.gif" />
          }

          {!this.state.isLoading &&
  <>

    <div className="icon-container">

      <Link to="/second-hand/t-shirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons first"></div>
          <div className="icon-description">T-shirts</div>
        </div>
      </Link>
            
      <Link to="/second-hand/hoodies/all">
        <div className="icon-wrapper">
          <div className="sh-icons second"></div>
          <div className="icon-description">Hoodies</div>
        </div>
      </Link>

      <Link to="/second-hand/dresses/all">
        <div className="icon-wrapper">
          <div className="sh-icons third"></div>
          <div className="icon-description">Dresses</div>
        </div>
      </Link>

      <Link to="/second-hand/skirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons fourth"></div>
          <div className="icon-description">Skirts</div>
        </div>
      </Link>

      <Link to="/second-hand/pants/all">
        <div className="icon-wrapper">
          <div className="sh-icons fifth"></div>
          <div className="icon-description">Pants</div>
        </div>
      </Link>

      <Link to="/second-hand/shoes/all">
        <div className="icon-wrapper">
          <div className="sh-icons sixth"></div>
          <div className="icon-description">Shoes</div>
        </div>
      </Link>

      <Link to="/second-hand/jackets/all">
        <div className="icon-wrapper">
          <div className="sh-icons seventh"></div>
          <div className="icon-description">Jackets</div>
        </div>
      </Link>

      <Link to="/second-hand/shorts/all">
        <div className="icon-wrapper">
          <div className="sh-icons eighth"></div>
          <div className="icon-description">Shorts</div>
        </div>
      </Link>

      <Link to="/second-hand/sweaters/all">
        <div className="icon-wrapper">
          <div className="sh-icons ninth"></div>
          <div className="icon-description">Sweaters</div>
        </div>
      </Link>

      <Link to="/second-hand/sweatshirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons tenth"></div>
          <div className="icon-description">Sweatshirts</div>
        </div>
      </Link>

      <Link to="/second-hand/shirts/all">
        <div className="icon-wrapper">
          <div className="sh-icons eleventh"></div>
          <div className="icon-description">Shirts</div>
        </div>
      </Link>

      <Link to="/second-hand/others/all">
        <div className="icon-wrapper">
          <div className="sh-icons twelfth"></div>
          <div className="icon-description">Others</div>
        </div>
      </Link>
            
    </div>

  </>
          }

          <div className="product-container">
            {this.state.items.slice(0, this.state.productsShowed).map(item => {

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
          </div>

          
        </div>
      </>
    );
  }
}

export default UsedItems