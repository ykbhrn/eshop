import axios from 'axios'
import {getToken} from './auth'

const withHeaders = () => {
  return {
    headers: {Authorization: `Bearer ${getToken()}`}
  }
}

export const getAllProducts = () => {
  return axios.get('/api/products')
} 

export const getSingleProduct = id => {
  return axios.get(`/api/products/${id}`)
}

export const createProduct = () => {
  return axios.post('/api/products')
}

export const getMyProfile = () => {
  return axios.get('/api/profile', withHeaders())
}

export const getPublicProfile = id => {
  return axios.get(`/api/profile/${id}`)
}

export const updateUserAccount = formData => {
  return axios.put('/api/user-update', formData, withHeaders())
}

export const registerUser = formData => {
  return axios.post('/api/register', formData)
}

export const loginUser = formData => {
  return axios.post('/api/login', formData)
}

export const forgotPassword = formData => {
  return axios.put('/api/forgot-password', formData)
}

export const resetPassword = formData => {
  return axios.put('/api/reset-password', formData)
}

export const addToBasket = (id, formData) => {
  return axios.post(`/api/basket/${id}/`, formData, withHeaders())
}

export const updateBasket = (id, formData) => {
  return axios.put(`/api/basket/${id}`, formData, withHeaders())
}

export const completeOrder = (paymentType, formData) => {
  return axios.put(`/api/complete/${paymentType}`, formData, withHeaders())
}

export const createOrder = (formData) => {
  return axios.post('/api/orders/create', formData)
}

export const removeFromBasket = (id, formData) => {
  return axios.put(`/api/basket/remove/${id}`, formData, withHeaders())
}

export const pendingOrder = (formData) => {
  return axios.post('/api/order', formData, withHeaders())
}

export const addShipping = (formData) => {
  return axios.put('/api/shipping', formData, withHeaders())
}

export const getAllDiscounts = () => {
  return axios.get('/api/discount')
}

export const addDiscount = (formData) => {
  return axios.put('/api/discount', formData, withHeaders())
}

export const createCheckoutSession = (formData) => {
  return axios.post('/api/payment', formData)
}