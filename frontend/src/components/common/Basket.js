import React from 'react';
import { getMyProfile, updateBasket, removeFromBasket } from '../../lib/api';
import { Link } from 'react-router-dom';

class Basket extends React.Component {
  state = {
    user: null,
    totalPrice: null,
    totalQuantity: null
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
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

  quantityBar = (totalQuantity, chosenQuantity) => {
    const quantity = [];
    for (let i = 1; i <= totalQuantity; i++) {
      quantity.push(i);
    }
    return quantity.map(item => {
      return <option key={item} value={item}>{item}</option>;
    });
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
      <div className="basket-page">
        {user.basket.length < 1 && 
          <div className="empty-basket">
            <h1>Your Basket is Empty</h1>
          </div>
        } 
        <div className="basket-container">
          {user.basket.map(item => {
            return <div className="basket-item-wrapper" key={item._id}>
              <div className="basket-item">
                <div className="basket-image-title">
                  <a href={`/products/${item._id}`} target="_blank" rel="noreferrer">
                    <img src={item.images[0]} />
                  </a>
                  <a href={`/products/${item._id}`} target="_blank" rel="noreferrer">
                    <h1>{item.name}</h1>
                  </a>
                </div>
                <div>{item.chosenColor}</div>
                <div>{item.chosenSize}</div>
                <div className="basket-price">Price: £{item.price}</div>
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
                      {this.quantityBar(item.quantity, item.chosenQuantity)} 
                    </select>
                  </form>
                </div>
                
                <div className="basket-subtotal">Subtotal: £{item.chosenQuantity * item.price}</div>
              </div>
            </div>;
          })}
        </div>

        {user.basket.length > 0 &&
         <div className="checkout-button-total-price">
           <div className="total-price">
           Total ({this.state.totalQuantity} Items): £{this.state.totalPrice}
           </div>
           <Link to="/checkout">
             <div className="chekout-button">Proceed to Chekout</div>
           </Link>
         </div>
        }
      </div>
    );
  }
}
export default Basket;
