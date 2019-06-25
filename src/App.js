import React,  { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchPostcode: "",
      searchStreet: "",
      searchNumber: "",
      searchAddition: "",
      searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      foundAddressesList: [],
      selectedAddress: null,
      getWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED" , "FAILED"
      serverWaterlabels: [],
      editedWaterlabel: null,
      email: "",
      waterlabelSaved: "NOT_SEND", // "SEND", "RECEIVED" , "FAILED"
      guiShowVideo: false,
      guiShowEmail: false,
      guidShowSuccesSave: false,
      guiEditLabel: false,
      guiLabelTab: "DAK", // "TUIN", "OVERIG"
      guiInfoTab: "PERSONAL", // "CALCULATION", "WHY"
    };
  };

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  };
}

export default App;
