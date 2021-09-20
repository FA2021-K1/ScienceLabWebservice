import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import './map.css'

const mapStyles = {
  position: "relative",
  left: '20px',
  width: '60%',
  height: '60%'
};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  close = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.close}
        zoom={16}
        style={mapStyles}
        initialCenter={
          {
            lat: 46.7419041,
            lng: 11.442103
          }
        }
      >
        <Marker
          name={'Bouy 1'}
          position={{lat: 46.743, lng: 11.4451}}
          totalSuspendedSolids={1032}
          totalDissolvedSolids={320}
          onClick={this.onMarkerClick}
        />
        <Marker
          name={'Bouy 2'}
          position={{lat: 46.7426, lng: 11.4471}}
          totalSuspendedSolids={364}
          totalDissolvedSolids={927}
          onClick={this.onMarkerClick}
        />
        <Marker
          name={'Bouy 3'}
          position={{lat: 46.7407, lng: 11.442}}
          totalSuspendedSolids={2808}
          totalDissolvedSolids={203}
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.close}
        >
          <div class="info"> 
            <h4>{'Total Suspended Solids'}</h4>
            <p>{this.state.selectedPlace.totalSuspendedSolids + ' NTU'}</p>
          </div>
          <div class="info"> 
            <h4>{'Total Dissolved Solids'}</h4>
            <p>{this.state.selectedPlace.totalDissolvedSolids + ' ppm'}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_TOKEN'
})(MapContainer);