import React from 'react';
import { getMyProfile, updateBasket, removeFromBasket } from '../../lib/api';
import { Link } from 'react-router-dom';
import {seo, mainMetaDescription} from '../../lib/functions'
import Navbar from '../common/Navbar';
import BasketIcon from '../common/BasketIcon';

class Basket extends React.Component {
  state = {
    user: null,
    totalPrice: null,
    totalQuantity: null
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "Shopping Basket | Nu Hippies",
        metaDescription: {mainMetaDescription}
      });
      
      const res = await getMyProfile();
      let priceSum = 0;
      let basketSize = 0;
      res.data.basket.map(item => {
        priceSum = priceSum + (item.chosenQuantity * item.price);
        basketSize = basketSize + Number(item.chosenQuantity);
      });
      this.setState({ user: res.data, totalPrice: priceSum, totalQuantity: basketSize });
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    if (event.target.name !== "quantity") {
      const formData = { ...this.state.formData, [event.target.name]: event.target.value };
      this.setState({ formData });
    } else if (event.target.name === "quantity" && !isNaN(Number(event.target.value)) && Number(event.target.value) < 100) {
      const formData = { ...this.state.formData, quantity: Number(event.target.value) };
      this.setState({ formData });
    }
  }

  increaseQuantity = (quantity, size, color) => {
    const formData = { quantity: quantity, size: size, color: color };
  }

  decreaseQuantity = (quantity, size, color) => {
    if (this.state.formData.quantity > 1) {
      const formData = { quantity: quantity, size: size, color: color };

    }
  }

  quantityBar = (item, color, size) => {
    const totalQuantityArray = [];

    if ( item.quantities.length > 0 ) {
      const newArray = item.quantities.filter(item => {
        return (item[0] == color || color === "default") && (item[1] == size || size === "default")
      })

      for (let i = 1; i <= newArray[0][2]; i++) {
        totalQuantityArray.push(i);
      }
    } else {
      for (let i = 1; i <= item.quantity; i++) {
        totalQuantityArray.push(i);
      }
    }
    
    return totalQuantityArray.map(thing => {
      return <option key={thing} value={thing}>{thing}</option>
    })
  }

  updateBasketItem = async (event, id, size, color) => {
    try {
      const formData = { quantity: event.target.value, size: size, color: color };
      await updateBasket(id, formData);
      this.props.basket();
      this.componentDidMount();
    } catch (err) {
      console.log(err);
    }
  }
  removeItem = async (id, size, color) => {
    try {
      const formData = { size: size, color: color}
      const res = await removeFromBasket(id, formData)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.user) return null;
    const { user } = this.state;
    return (
      <>
        <Navbar />

        <style>
          {'\
          .basket-icon-wrapper{\
            display: flex;\
          }\
          '}
        </style>
        
        <div className="basket-page">
        
          {user.basket.length < 1 && 
          <div className="empty-basket">
            <h1>Your Basket is Empty</h1>
          </div>
          } 
          <div className="basket-container">
            {user.basket.map(item => {

              const newName = item.name.replaceAll(' ', '-');

              return <div className="basket-item-wrapper" key={item._id}>
                <div className="basket-item">
                  <div className="basket-image-title">
                    <a href={`/products/${newName}/${item._id}`} target="_blank" rel="noreferrer">
                      <img src={item.images[0].images[0]} alt={item.name} />
                    </a>
                    <a href={`/products/${newName}/${item._id}`} target="_blank" rel="noreferrer">
                      <h1>{item.name}</h1>
                    </a>
                  </div>
                  <div className="color-size-price">
                    <div>{item.chosenColor}</div>
                    <div>{item.chosenSize}</div>
                    <div className="basket-price">£{item.price / 100}</div>
                  </div>
                </div>
              
                <div className="basket-subtotal-remove">
                  <div className="basket-remove" onClick={() => {
                    this.removeItem(item._id, item.chosenSize, item.chosenColor)
                  }}>Remove</div>

                  <div className="quantity-basket-wrapper">
                    <form>
                      <label>Quantity:</label>
                      <select value={item.chosenQuantity} onChange={() => {
                        this.updateBasketItem(event, item._id, item.chosenSize, item.chosenColor)
                      }}>
                        {this.quantityBar(item, item.chosenColor, item.chosenSize)} 
                      </select>
                    </form>
                  </div>
                
                  <div className="basket-subtotal">Subtotal: £{(item.chosenQuantity * item.price) / 100}</div>
                </div>
              </div>;
            })}
          </div>

          {user.basket.length > 0 &&
          <div className="checkout-button-total-price">
            <div className="total-price">
              <div>Sum ({this.state.totalQuantity} Items(s)): £{user.sumPrice / 100}</div>
              <div>Your Discount: {user.discount}% (£{user.discountAmount / 100})</div>
              <div>Total Price: £{user.totalPrice / 100}</div>
            </div>
            <Link to="/checkout" title="Checkout">
              <div className="checkout-button">Proceed to Chekout</div>
            </Link>
          </div>
          }
        </div>
      </>
    );
  }
}
export default Basket
