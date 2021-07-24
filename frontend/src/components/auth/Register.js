import React from 'react'
import axios from 'axios'
import {setToken} from '../../lib/auth'
import {Redirect, Link} from 'react-router-dom'
import {loginUser, registerUser} from '../../lib/api'

class Register extends React.Component {
  state = {
    formData: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      bio: '',
      profileImage: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'
    },
    errors: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      userType: ''
    },
    rediterct: false,
    isLoading: false
  }
}

render() {
  return (
    <>
      
    </>
  )
}

export default Register