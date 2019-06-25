import React,  { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchPostcode: "",
      searchStreet: "",
      searchNumber: "",
      searchAddition: "",
      searchCity: "",
      searchOnCityStreet: false,
      searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      foundAddressesList: [],
      selectedAddress: null,
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

  fetchBuildings () {

    this.setState({searchAddressState: "SEND"});

    const that = this

    const postcode = "1188AL";
    const number = "34"
    fetch( `/api/v2/buildings/?postalcode=${postcode}&housenumber=${number}&page_size=1000000`)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        searchAddressState: "RECEIVED",
        foundAddressesList: (parsedJSON.results && parsedJSON.results.length)? parsedJSON.results : [],
        selectedAddress: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0] : null,
      })
      console.log(JSON.stringify(parsedJSON));
    })
    .catch(error =>{
      that.setState({searchAddressState: "FAILED"})
      console.error('Error:', error);

    });
  }

  createNewLabel() {
    return;
  }

  render () {
    return (
      <div className="App">
        
        <form>

        <div
            style={
              this.state.searchOnCityStreet===true ? {} : {display: "none"} 
            }
          >
            <label htmlFor="searchCity">
              Stad:
            </label>
            <input
              id="searchCity"
              value={this.state.searchCity}
              onChange={e=>this.setState({searchCity: e.target.value})}
            />
          </div>

          <div
            style={
              this.state.searchOnCityStreet===false ? {} : {display: "none"} 
            }
          >
            <label htmlFor="searchPostcode">
              Postcode:
            </label>
            <input
              id="searchPostcode"
              value={this.state.searchPostcode}
              onChange={e=>this.setState({searchPostcode: e.target.value})}
            />
          </div>
          
          <div
            style={
              this.state.searchOnCityStreet===true ? {} : {display: "none"} 
            }
          >
            <label htmlFor="searchStreet">
            Straat:
            </label>
            <input
              id="searchStreet"
              value={this.state.searchStreet}
              onChange={e=>this.setState({searchStreet: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="searchNumber">
              Nummer:
            </label>
            <input
              id="searchNumber"
              value={this.state.searchNumber}
              onChange={e=>this.setState({searchNumber: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="searchAddition">
              Toevoeging:
            </label>
            <input
              id="searchAddition"
              value={this.state.searchAddition}
              onChange={e=>this.setState({searchAddition: e.target.value})}
            />
          </div>
          
          
          <div>
            <button
              style={
                this.state.searchOnCityStreet===false ? {} : {display: "none"} 
              }
              onClick={ e => {
                this.setState({searchOnCityStreet: true})
                // prevent form reloading with preventDefault
                e.preventDefault();
              }}
            >
              Zoek op straat
            </button>

            <button
              style={
                this.state.searchOnCityStreet===true ? {} : {display: "none"} 
              }
              onClick={ e => {
                this.setState({searchOnCityStreet: false})
                // prevent form reloading with preventDefault
                e.preventDefault();
              }}
            >
              Zoek op postcode
            </button>
          </div>
          
          <div>
            <button
              onClick={ e => {
                this.fetchBuildings();
                // prevent form reloading with preventDefault
                e.preventDefault();
              }}
            >
              Zoek
            </button>
            <span>{this.state.searchAddressState}</span>
            <div>Found Addresses:</div>
            {
              this.state.foundAddressesList.map(address=>{
                return (
                  <div
                    key={address.houseaddresses[0].housenumber}
                  >
                    <span>{address.houseaddresses[0].street}</span>
                    <span>{address.houseaddresses[0].housenumber}</span>
                  </div>
                );
              })
            }
            <div>Selected Address:</div>
            <div>
              <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].street}</span>
              <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].housenumber}</span>
            </div>
          </div>
        </form>

        <form>
          <div>
            _____________________________________
          </div>
          
          <button
            onClick={e=>{
              this.createNewLabel();
              e.preventDefault();
            }}
          >
            Nieuw Label
          </button>
          <button
            onClick={e=>{
              e.preventDefault();
            }}
          >
            Label Opslaan
          </button>
          <button
            onClick={e=>{
              e.preventDefault();
            }}
          >
            Verander
          </button>

          <div>
            _____________________________________
          </div>

        </form>

        <form>
          <div>
            <label htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              value={this.state.email}
              onChange={e=>this.setState({email: e.target.value})}
            />
          </div>
        </form>

      </div>
    );
  };
}

export default App;
