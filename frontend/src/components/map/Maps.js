import React from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL from "react-map-gl";
import { mapAccess, MAP_STYLE_URL } from "../../lib/mapbox";

// Dimensions of the map canvas (not the mapbox style URL - see MAP_STYLE_URL).
const mapDimensions = {
  width: "100%",
  height: 600,
};

const queryParams = {
  country: "gb",
};

class Maps extends React.Component {
  state = {
    // Central London, so the canvas has somewhere to sit before a search.
    viewport: {
      latitude: 51.5074,
      longitude: -0.1278,
      zoom: 10,
    },
  };

  onSelected = (viewport, item) => {
    this.setState({ viewport });
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

        <ReactMapGL
          {...mapAccess}
          {...viewport}
          {...mapDimensions}
          mapStyle={MAP_STYLE_URL}
          onViewportChange={(newViewport) => this.setState({ viewport: newViewport })}
          onError={(e) => console.error('Mapbox error', e && e.error && e.error.status)}
        />
      </div>
    );
  }
}

export default Maps;
