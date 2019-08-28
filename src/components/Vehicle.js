import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import VehiclesList from "./VehicleList";

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Vehicle extends Component {
  render() {
    const google = this.props.google

    return (
      <VehiclesList>
        {vehicles => {
          return (
            <div>
              <Map
                google={google}
                zoom={8}
                style={mapStyles}
                initialCenter={{
                 lat: 52.53,
                 lng: 13.403
                }}
              >
                {markedVehicles(vehicles).map((value, index) => {
                  return value
                })}
              </Map>
          </div>
        );}}
      </VehiclesList>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(Vehicle);

function markedVehicles(vehicles) {
  var marked = []
  for (const key in vehicles) {
    var vehicle = vehicles[key]
    marked.push(renderVehichle(vehicle))
  }
  return marked;
}

function renderVehichle(vehicle) {
  if (!!vehicle.current_latitude) {
    var currentLatitude = Number(vehicle.current_latitude)
    var currentLongitude = Number(vehicle.current_longitude)
    return <Marker position={{ lat: currentLatitude, lng: currentLongitude}} />
  }
}
