import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Flat from './components/flat';
import Marker from './components/marker';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      selectedFlat: null
    };
  }
  componentDidMount() {   //
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"; // json to be used by component, with details of flats
    fetch(url) // AJAX request
      .then(response => response.json())
      .then((data) => {  // data is an array of flats
        this.setState({
          flats: data   //we pass the keys we want to change,we want to change the flats and we assign it to the data we got
        });  //so we change component state and React understands that the state changed and will render the component again
      })
  }
  selectFlat = (flat) => {
    console.log(flat);
    this.setState({
      selectedFlat: flat
    })
  }

  render() {
    let center = {
      lat: 48.8566,
      lng: 2.3522
    }


    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }
    return (
      <div className="app">
        <div className="main">
          <div className="search">

          </div>
          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat
              key={flat.name}
              flat={flat}
              selectFlat={this.selectFlat} />
            })}

          </div>
         </div>
          <div className="map">
            <GoogleMapReact
              center={center}
              defaultZoom={11}>
              {this.state.flats.map((flat) => {
              return <Marker
              key={flat.name}
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price}
              selected={flat === this.state.selectedFlat} />
            })}

            </GoogleMapReact>
          </div>
      </div>
    );
  }
}
export default App;
