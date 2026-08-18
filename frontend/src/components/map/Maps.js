import React, { Component } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL from "react-map-gl";

const mapAccess = {
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
};

const mapStyle = {
  width: "100%",
  height: 600,
};

const queryParams = {
  country: "gb",
};

class Maps extends React.Component {
  state = {
    viewport: {},
  };

  onSelected = (viewport, item) => {
    this.setState({ viewport });
    console.log("Selected: ", item);
  };

  render() {
    const { viewport } = this.state;

    return (
      <div>
        <Geocoder
          {...mapAccess}
          onSelected={this.onSelected}
          viewport={viewport}
          hideOnSelect={true}
          queryParams={queryParams}
          initialViewState={{
            longitude: 22.1525555224921,
            latitude: 48.9923554,
            zoom: 30.5,
          }}
        />

        {/* <ReactMapGL
        {...mapAccess} {...viewport} {...mapStyle}
        onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
      /> */}
      </div>
    );
  }
}

export default Maps;
