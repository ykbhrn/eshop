import React from 'react'
import {Link} from 'react-router-dom'
import { getAllProducts } from '../../lib/api'

class AllProducts extends React.Component {
  state = {
    products: []
  }

  async componentDidMount() {
    try {
      const res = await getAllProducts()
      this.setState({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
      
      </>
    )
  }
}


export default AllProducts