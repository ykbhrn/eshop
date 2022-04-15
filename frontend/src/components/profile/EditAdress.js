import React from 'react';
import { logout } from '../../lib/auth';
import { getMyProfile, pendingOrder } from '../../lib/api';
import { Link } from 'react-router-dom';


class EditAdress extends React.Component {
  state = {
    formData: {
      email: null,
      name: null,
      phone: null,
      password: null,
      passwordConfirmation: null,
      isBillingAdress: "no",
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
    },
    user: null,
    isEdit: false,
    isLoading: false
  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)
      const res = await getMyProfile()
      if (res.data.paidOrders.length > 0) {
        this.setState({ user: res.data, formData: res.data.paidOrders[0] })
      } else if (res.data.pendingOrder) {
        this.setState({ user: res.data, formData: res.data.pendingOrder })
      } else {
        this.setState({ user: res.data })
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleBillingChange = event => {
    const formData = {
      ...this.state.formData, billingAdress: {
        ...this.state.formData.billingAdress, [event.target.name]: event.target.value
      }
    };
    const errors = { ...this.state.errors, [event.target.name]: '' };
    this.setState({ formData, errors });
  }

  addAdress = async (event) => {
    event.preventDefault();
    try {
      const res = await pendingOrder(this.state.formData);
      if (res.status === 201) {
        this.setState({ isEdit: false })
        this.componentDidMount()
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
    if (errors.errors.pendingOrder.errors.billingAdress) {
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

    this.setState({
      errors: {
        name, adressOne, town, postcode, country, billingAdress: {
          name: billingName,
          adressOne: billingAdressOne,
          town: billingTown,
          postcode: billingPostcode,
          country: billingCountry
        }
      }
    })
  }

  showEdit = () => {
    this.setState({ isEdit: true })
  }

  handleLogout = () => {
    logout()
    return window.location.assign('/')
  }

  render() {
    if (!this.state.user) return null
    const { user, formData, errors, isLoading } = this.state
    return (
      <div className="edit-adress-page change-brightness">
        <div className="account-nav">
          <Link to="/profile">Your Acount</Link>
          <span className="sign">&gt;</span>
          <div>Edit Adress</div>
        </div>

        {!this.state.isEdit &&
          <div className="edit-line-container">
            <div className="shipping-billing-edit">
              <div className="shipping-edit-container">
                <h2>Shipping Adress:</h2>
                <div className="edit-line"><span className="bold">Name:</span> {formData.name}</div>
                <div className="edit-line"><span className="bold">Adress Line 1:</span> {formData.adressOne}</div>
                {formData.adressTwo && <div className="edit-line"><span className="bold">Adress Line 1:</span> {formData.adressTwo}</div>}
                <div className="edit-line"><span className="bold">Town/City:</span> {formData.town}</div>
                <div className="edit-line"><span className="bold">Postcode:</span> {formData.postcode}</div>
                <div className="edit-line"><span className="bold">Country:</span> {formData.country}</div>
                {formData.phone && <div className="edit-line"><span className="bold">Phone Number:</span> {formData.phone}</div>}

                {formData.isBillingAdress === "no" &&
              <div className="isBilling">
                <h2>Billing Adress:</h2>
                <div>Same as Shipping Adress</div>
              </div>
                }
              </div>

              <div className="billing-edit-container">
                {formData.isBillingAdress === "yes" &&
                <>
                  <h2>Billing Adress:</h2>
                  <div className="edit-line"><span className="bold">Name:</span> {formData.billingAdress.name}</div>
                  <div className="edit-line"><span className="bold">Adress Line 1:</span> {formData.billingAdress.adressOne}</div>
                  {formData.billingAdress.adressTwo && <div className="edit-line"><span className="bold">Adress Line 2:</span> {formData.billingAdress.adressTwo}</div>}
                  <div className="edit-line"><span className="bold">Town/City:</span> {formData.billingAdress.town}</div>
                  <div className="edit-line"><span className="bold">Postcode:</span> {formData.billingAdress.postcode}</div>
                  <div className="edit-line"><span className="bold">Country:</span> {formData.billingAdress.country}</div>
                  {formData.billingAdress.phone && <div className="edit-line"><span className="bold">Phone Number:</span> {formData.billingAdress.phone}</div>}
                </>
                }
              </div>
            </div>
            <button className="classic-btn" onClick={this.showEdit}>Edit</button>
          </div>
        }

        {this.state.isEdit &&
          <>
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
                <select id="checkout-country" className={`${errors.country ? 'error-input' : ''}`}
                  name="country"
                  onChange={this.handleChange}
                  value={formData.country}
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Austria">Austria</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Czechia">Czechia</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Greece">Greece</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Italy">Italy</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Malta">Malta</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Norway">Norway</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Romania">Romania</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Spain">Spain</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
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
                  <select id="checkout-country" className={`${errors.country ? 'error-input' : ''}`}
                    name="country"
                    onChange={this.handleBillingChange}
                    value={formData.billingCountry}
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Austria">Austria</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Czechia">Czechia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Malta">Malta</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Norway">Norway</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>

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
            {isLoading &&
                <div className="classic-btn btn-loading">
                  <img src='https://res.cloudinary.com/nuhippies/image/upload/v1639599208/Nu%20Hippies/icons/loading_nxaifn.svg' className='loading-image' />
                </div>
            }
            {!isLoading &&
            <button className="classic-btn" onClick={this.addAdress}>Change</button>
            }
          </>
        }

      </div>
    );
  }

}

export default EditAdress