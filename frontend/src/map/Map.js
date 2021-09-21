import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '60%',
  height: '60%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={
          {
            lat: 46.7419041,
            lng: 11.442103
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'insert your key here'
})(MapContainer);
