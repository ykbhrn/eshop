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
  return axios.get('/api/profile/', withHeaders())
}

export const getPublicProfile = id => {
  return axios.get(`/api/profile/${id}`)
}

export const registerUser = formData => {
  return axios.post('/api/register/', formData)
}

export const loginUser = formData => {
  return axios.post('/api/login/', formData)
}

export const addToBasket = (id, formData) => {
  return axios.post(`/api/basket/${id}/`, formData, withHeaders())
}

export const basketLength = () => {
  return axios.get('/api/basket', withHeaders())
}