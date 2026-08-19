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
          <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Ctext%20x%3D%2750%27%20y%3D%2754%27%20font-size%3D%2778%27%20text-anchor%3D%27middle%27%20dominant-baseline%3D%27central%27%3E%F0%9F%A7%98%3C%2Ftext%3E%3C%2Fsvg%3E" />
        </div>

      </>
    );
  }
}

export default ForumIndex