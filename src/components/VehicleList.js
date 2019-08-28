import React, { Component } from 'react';
import ActionCable from 'actioncable';

class VehicleList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vehicles: {}
    }
  }

  componentDidMount = () => {
    let cable = ActionCable.createConsumer('ws://localhost:3001/cable');
    let self = this;

    cable.subscriptions.create('VehicleChannel', {
      received(vehicle) {
        let vehicles = Object.assign({}, self.state.vehicles);
        let key = vehicle.id;

        vehicles[key] = vehicle;

        self.setState({ vehicles });
      }
    });
  }

  render() {
    return this.props.children(this.state.vehicles);
  }
}

export default VehicleList;
