import React from 'react';
import {seo, mainMetaDescription} from '../../lib/functions'
import SecondHandNavbar from '../second-hand/SecondHandNavbar';

class ForumIndex extends React.Component {
  state = {

  }

  async componentDidMount() {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "NHM Forum",
        metaDescription: {mainMetaDescription}
      });

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <SecondHandNavbar /> 

        <div className='main-forum-page'>
          <h1>Forum section is currently under development</h1>
          <img src="https://res.cloudinary.com/nuhippies/image/upload/v1665541254/Nu%20Hippies/icons/relax_iha4la.png" />
        </div>

      </>
    );
  }
}

export default ForumIndex