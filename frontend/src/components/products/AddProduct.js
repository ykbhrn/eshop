// import React from 'react'
// import { addArticles } from '../../lib/api'
// import { Redirect, Link } from 'react-router-dom'
// import axios from 'axios'

// class AddProduct extends React.Component {
//   state = {
//     formData: {
//       images:[
//         "images": []
//       ]
//     },
//     isLoading: false,
//     redirect: false,
//     error: ''
//   }

//   handleChange = event => {
//     const formData = { ...this.state.formData, [event.target.name]: event.target.value }
//     this.setState({ formData, error: '' })
//   }

//   handleSubmit = async event => {
//     event.preventDefault()
//     try {
//       await addArticles(this.state.formData)
//       this.setState({ redirect: true })
//     } catch (err) {
//       this.setState({ error: 'Invalid Credentials' })
//     }
//   }


//   renderRedirect = () => {
//     if (this.state.redirect) {
//       return <Redirect to="/portfolio" />
//     }
//   }

//   setUrl = imgUrl => {
//     const formData = { ...this.state.formData, imageUrl: imgUrl }
//     this.setState({ formData })
//   }

//   handleUpload = async event => {
//     try {
//       this.setState({ isLoading: true })
//       const data = new FormData()
//       data.append('file', event.target.files[0])
//       data.append('upload_preset', uploadPreset)
//       const res = await axios.post(uploadUrl, data)
//       console.log(res.data)
//       this.setState({ isLoading: false })
//       this.setUrl(res.data.url)
//     } catch (err) {
//       console.log('err=', err)
//     }
//   }

//   setBigUrl = imgUrl => {
//     const formData = { ...this.state.formData, titleImageUrl: imgUrl }
//     this.setState({ formData })
//   }

//   handleBigUpload = async event => {
//     try {
//       this.setState({ isLoading: true })
//       const data = new FormData()
//       data.append('file', event.target.files[0])
//       data.append('upload_preset', uploadPreset)
//       const res = await axios.post(uploadUrl, data)
//       console.log(res.data)
//       this.setState({ isLoading: false })
//       this.setBigUrl(res.data.url)
//     } catch (err) {
//       console.log('err=', err)
//     }
//   }


//   render() {
//     const { formData, error } = this.state
//     console.log(this.state.formData)
//     return (
//       <section className="add-article-section">
//         {this.renderRedirect()}
//         <h1 className="title is-2 has-text-centered">Add New Article</h1>

//         <div className="add-article-container">
//           <form onSubmit={this.handleSubmit}>
//             <label className="label">Title</label>
//             <div className="field">
//               <input
//                 className={`input ${error ? 'is-danger' : ''}`}
//                 placeholder='Article Title'
//                 name="title"
//                 onChange={this.handleChange}
//                 value={formData.title}
//               />
//               {error && <small className="help is-danger">{error}</small>}
//             </div>

//             <label className="label">Small Image</label>
//             <div className="upload-portfolio">
//               <input
//                 className={`input ${error.imageUrl ? 'is-danger' : ''}`}
//                 type="file"
//                 onChange={this.handleUpload}
//               />
//               {formData.imageUrl ? <img src={formData.imageUrl} alt="User's Upload" controls /> : ''}
//             </div>
//             {error.imageUrl && <small className="help is-danger">{error.imageUrl}</small>}

//             <label className="label">Big Image(not mandatory)</label>
//             <div className="upload-portfolio">
//               <input
//                 className={`input ${error.titleImageUrl ? 'is-danger' : ''}`}
//                 type="file"
//                 onChange={this.handleBigUpload}
//               />
//               {formData.titleImageUrl ? <img src={formData.titleImageUrl} alt="User's Upload" controls /> : ''}
//             </div>
//             {error.titleImageUrl && <small className="help is-danger">{error.titleImageUrl}</small>}

//             <div className="field">
//               <textarea
//                 className={`textarea ${error ? 'is-danger' : ''}`}
//                 rows='15'
//                 cols='70'
//                 placeholder='Text'
//                 name="text"
//                 onChange={this.handleChange}
//                 value={formData.text}
//               />
//               {error && <small className="help is-danger">{error}</small>}
//             </div>

//             {this.state.isLoading && <>
//               <img src='https://res.cloudinary.com/djq7pruxd/image/upload/v1592484110/loading_ngtamg.svg' className='loading-image' />
//             </>
//             }
//             {!this.state.isLoading &&
//               <button type="submit" className='button'> Post It
//               </button>
//             }

//           </form>
//         </div>
//       </section>
//     )
//   }
// }

// export default AddProduct