import React from 'react';
import { getMyProfile, pendingOrder } from '../../lib/api';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  state = {
    user: null,
    formData: {
      name: null,
      company: null,
      adressOne: null,
      adressTwo: null,
      town: null,
      postcode: null,
      country: null,
      phone: null,
      isBillingAdress: "no",
      shipping: 3.99,
      billingAdress: {
        name: null,
        company: null,
        adressOne: null,
        adressTwo: null,
        town: null,
        postcode: null,
        country: null,
        phone: null,
      },
    },
    errors: {
      name: null,
      adressOne: null,
      town: null,
      postcode: null,
      country: null,
      billingAdress: {
        name: null,
        adressOne: null,
        town: null,
        postcode: null,
        country: null,
      }
    }
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getMyProfile()
      let basketSize = 0
      res.data.basket.map(item => {
        basketSize = basketSize + Number(item.chosenQuantity)
      })
      if (res.data.pendingOrder) {
        this.setState({ user: res.data, totalQuantity: basketSize, formData: res.data.pendingOrder });
      } else if (res.data.finishedOrder){
        this.setState({ user: res.data, totalQuantity: basketSize, formData: res.data.finishedOrder });
      } else {
        this.setState({ user: res.data, totalQuantity: basketSize })
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value };
    const errors = { ...this.state.errors, [event.target.name]: '' };
    this.setState({ formData, errors });
  }

  handleBillingChange = event => {
    const formData = { ...this.state.formData, billingAdress: {
      ...this.state.formData.billingAdress, [event.target.name]: event.target.value }};
    const errors = { ...this.state.errors, [event.target.name]: '' };
    this.setState({ formData, errors});
  }

  makeOrder = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...this.state.formData, shipping: 399 };
      const res = await pendingOrder(formData);
      if (res.status === 201) {
        this.props.history.push('/shipping');
      } else if (res.status === 422) {
        throw new Error();
      }

    } catch (err) {
      this.handleErrors(err.response.data);
    }
  }

  handleErrors = (errors) => {
    const errorShipping = errors.errors.pendingOrder.errors;
    let name = '';
    let adressOne = '';
    let town = '';
    let postcode = '';
    let country = '';
    let billingName = '';
    let billingAdressOne = '';
    let billingTown = '';
    let billingPostcode = '';
    let billingCountry = '';

    if (errorShipping.name) {
      name = "Your Full Name is Required";
    }
    if (errorShipping.adressOne) {
      adressOne = "Your Adress is Required";
    }
    if (errorShipping.town) {
      town = 'Your City/Town is Required';
    }
    if (errorShipping.postcode) {
      postcode = 'Your Postcode is Required';
    }
    if (errorShipping.country) {
      country = 'Your Country is Required';
    }
    if ( errors.errors.pendingOrder.errors.billingAdress) {
      const errorBilling = errors.errors.pendingOrder.errors.billingAdress.errors;

      if (errorBilling.name) {
        billingName = "Your Full Name is Required";
      }
      if (errorBilling.adressOne) {
        billingAdressOne = "Your Adress is Required";
      }
      if (errorBilling.town) {
        billingTown = 'Your City/Town is Required';
      }
      if (errorBilling.postcode) {
        billingPostcode = 'Your Postcode is Required';
      }
      if (errorBilling.country) {
        billingCountry = 'Your Country is Required';
      }
    }

    this.setState({ errors: { name, adressOne, town, postcode, country, billingAdress: {
      name: billingName,
      adressOne: billingAdressOne,
      town: billingTown,
      postcode: billingPostcode,
      country: billingCountry
    } } });
  }

  render() {
    if (!this.state.user) return null;
    const { user, formData, errors } = this.state;
    return (
      <div className="checkout-page">

        <div className="forms-wrapper">
          <h2>Shipping Adress:</h2>
          <form className="checkout-form">
            <label>Full Name:</label>
            <input
              className={`${errors.name ? 'error-input' : ''}`}
              name="name"
              onChange={this.handleChange}
              value={formData.name}
            />
            {errors.name ? <small className="error-message">{errors.name}</small> : ''}

            <label>Company (Optional):</label>
            <input
              name="company"
              onChange={this.handleChange}
              value={formData.company}
            />

            <label>Adress Line 1:</label>
            <input
              className={`${errors.adressOne ? 'error-input' : ''}`}
              name="adressOne"
              onChange={this.handleChange}
              value={formData.adressOne}
            />
            {errors.adressOne ? <small className="error-message">{errors.adressOne}</small> : ''}

            <label>Adress Line 2 (optional):</label>
            <input
              name="adressTwo"
              onChange={this.handleChange}
              value={formData.adressTwo}
            />

            <label>City/Town:</label>
            <input
              className={`${errors.town ? 'error-input' : ''}`}
              name="town"
              onChange={this.handleChange}
              value={formData.town}
            />
            {errors.town ? <small className="error-message">{errors.town}</small> : ''}
          
            <label>Postcode:</label>
            <input
              className={`${errors.postcode ? 'error-input' : ''}`}
              name="postcode"
              onChange={this.handleChange}
              value={formData.postcode}
            />
            {errors.postcode ? <small className="error-message">{errors.postcode}</small> : ''}

            <label>Country:</label>
            <input
              className={`${errors.country ? 'error-input' : ''}`}
              name="country"
              onChange={this.handleChange}
              value={formData.country}
            />
            {errors.country ? <small className="error-message">{errors.country}</small> : ''}

            <label>Phone number (optional):</label>
            <input
              name="phone"
              onChange={this.handleChange}
              value={formData.phone}
            />
          </form>

          <div className="billing-radio">
            <h2>Billing Adress:</h2>
            <div>
              <input
                name="isBillingAdress"
                type="radio"
                value="no"
                onChange={this.handleChange}
                checked={formData.isBillingAdress === "no"}
              />
              <label>Same as shipping adress:</label>
            </div>

            <div>
              <input
                name="isBillingAdress"
                type="radio"
                value="yes"
                onChange={this.handleChange}
                checked={formData.isBillingAdress === "yes"}
              />
              <label>Use diffent one:</label>
            </div>
          </div>

          {this.state.formData.isBillingAdress === "yes" &&
          <form className="checkout-form">
            <label>Full Name:</label>
            <input
              className={`${errors.billingAdress.name ? 'error-input' : ''}`}
              name="name"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.name : ""}
            />
            {errors.billingAdress.name ? <small className="error-message">{errors.billingAdress.name}</small> : ''}

            <label>Company (Optional):</label>
            <input
              name="company"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.company : ""}
            />

            <label>Adress Line 1:</label>
            <input
              className={`${errors.billingAdress.adressOne ? 'error-input' : ''}`}
              name="adressOne"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.adressOne : ""}
            />
            {errors.billingAdress.adressOne ? <small className="error-message">{errors.billingAdress.adressOne}</small> : ''}

            <label>Adress Line 2 (optional):</label>
            <input
              name="adressTwo"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.adressTwo : ""}
            />

            <label>City/Town:</label>
            <input
              className={`${errors.billingAdress.town ? 'error-input' : ''}`}
              name="town"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.town : ""}
            />
            {errors.billingAdress.town ? <small className="error-message">{errors.billingAdress.town}</small> : ''}

            <label>Postcode:</label>
            <input
              className={`${errors.billingAdress.postcode ? 'error-input' : ''}`}
              name="postcode"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.postcode : ""}
            />
            {errors.billingAdress.postcode ? <small className="error-message">{errors.billingAdress.postcode}</small> : ''}

            <label>Country:</label>
            <input
              className={`${errors.billingAdress.country ? 'error-input' : ''}`}
              name="country"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.country : ""}
            />
            {errors.billingAdress.country ? <small className="error-message">{errors.billingAdress.country}</small> : ''}

            <label>Phone number (optional):</label>
            <input
              name="phone"
              onChange={this.handleBillingChange}
              value={formData.billingAdress ? formData.billingAdress.phone : ""}
            />
          </form>
          }
        </div>

        <div className="basket-preview">
          <div className="order-items-container">
            {user.basket.map(item => {            
              return <div key={item.id} className="image-checkout-wrapper"> 
                <div className="image-checkout" style={{
                  backgroundImage: `url(${item.images[0].images[0]})`
                }}>
                </div>  
                <div className="image-checkout-name">
                  {item.name}
                  <div className="image-checkout-description">
                    <span className="size">Size: {item.chosenSize}</span>
                    <span className="color">Color: {item.chosenColor}</span>
                  Quantity: {item.chosenQuantity}
                  </div>
                </div>
              </div>;
            })}
          </div>
          <div className="total-price-checkout-wrapper">
            <div>Sum ({this.state.totalQuantity} Items): £{user.sumPrice / 100}</div>
            <div>Your Discount: {user.discount}% (£{ Math.round(((user.discount / 100) * user.sumPrice)) / 100})</div>
            <div>Total Price: £{user.totalPrice / 100}</div>
          </div>
          <div className="checkout-buttons">
            <Link to="/basket">
              <button className="left">Go Back To Basket</button>
            </Link>
            <button className="right" onClick={this.makeOrder}>Continue</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;