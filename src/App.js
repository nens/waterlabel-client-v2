import React,  { Component } from 'react';
import './App.css';

import LabelForm from "./LabelForm";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      assetTypesFromServer: [],
      assetTypeFetchState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"

      searchPostcode: "",
      searchStreet: "",
      searchNumber: "",
      searchAddition: "",
      searchCity: "",

      searchOnCityStreet: false,
      searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      foundAddressesList: [],
      selectedAddress: null,
      
      fetchWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      currentWaterLabels: [],
      latestWaterlabel: null,
      editedWaterlabel: null,

      email: "",
      waterlabelSaved: "NOT_SEND", // "SEND", "RECEIVED" , "FAILED"
      
      guiShowVideo: false,
      guiShowEmail: false,
      guidShowSuccesSave: false,
      guiEditLabel: false,
      guiLabelTab: "DAK", // "TUIN", "VOORZIENING"
      guiInfoTab: "PERSONAL", // "CALCULATION", "WHY"
    };

    this.fetchAssetTypes();
  };

  fetchAssetTypes () {
    const that = this;
    fetch( "/api/v2/waterlabelassettypes/")
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        assetTypeFetchState: "RECEIVED",
        assetTypesFromServer: parsedJSON ? parsedJSON : [],
      })
      console.log(JSON.stringify(parsedJSON));
    })
    .catch(error => {
      that.setState({assetTypeFetchState: "FAILED"})
      console.error('Error:', error);
    });
  }

  fetchBuildings () {

    this.setState({searchAddressState: "SEND"});

    const that = this;

    const postcode = "1188AL";
    const number = "36"
    fetch( `/api/v2/buildings/?postalcode=${postcode}&housenumber=${number}&page_size=1000000`)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState(
        {
        searchAddressState: "RECEIVED",
        foundAddressesList: (parsedJSON.results && parsedJSON.results.length)? parsedJSON.results : [],
        selectedAddress: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0] : null,
        // currentWaterLabels: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0].waterlabels : [],
        // latestWaterlabel: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0].waterlabels[0] : null
        }
        ,( _ => that.fetchWaterlabelsFromBuilding())
      )
      console.log(JSON.stringify(parsedJSON));
    })
    .catch(error => {
      that.setState({searchAddressState: "FAILED"})
      console.error('Error:', error);

    });
  }

  fetchWaterlabelsFromBuilding () {

    this.setState({fetchWaterlabelState: "SEND"});

    const that = this;

    
    fetch( `/api/v2/waterlabels/?building=${this.state.selectedAddress.id}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        fetchWaterlabelState: "RECEIVED",
        currentWaterLabels: parsedJSON.results,
        latestWaterlabel: parsedJSON.results[0], // assume first one from api is latest waterlabel
      })
      console.log(JSON.stringify(parsedJSON));
    })
    .catch(error => {
      that.setState({fetchWaterlabelState: "FAILED"})
      console.error('Error:', error);

    });
  }

  createNewLabel() {
    return;
  }
  changeLabel(){
    return;
  }
  saveLabel(){
    return;
  }

  render () {
    return (
      <div className="App">

        {/* <div>
          <span>assetTypeFetchState: </span>
          {this.state.assetTypeFetchState}
        <ul>
          {this.state.assetTypesFromServer.map(asset=>
            <li>{asset.name}</li>
          )}
        </ul>
        </div> */}
        
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

        {/* <div>
          <span>fetchWaterlabelState: </span>
          <span>{this.state.fetchWaterlabelState}</span>
          <div>
            <span>Amount waterlabel: </span>
            <span>{this.state.currentWaterLabels.length}</span>
          </div>
          <div>
            <span>Timestamp latest label: </span>
            <span>{this.state.latestWaterlabel && this.state.latestWaterlabel.timestamp}</span>
          </div>
        </div> */}

        <form>
          <div>_____________________________________</div>
          
          <div
            style={
              this.state.assetTypeFetchState === "RECEIVED" &&
              ( this.state.latestWaterlabel || this.state.editedWaterlabel) ?
              {}
              :
              {display: "none"}
            }
          >
            <LabelForm
              assetTypesFromServer={this.state.assetTypesFromServer}
              latestWaterlabel={this.state.latestWaterlabel}
              editedWaterlabel={this.state.editedWaterlabel}
              guiLabelTab={this.state.guiLabelTab}

              createNewLabel={this.createNewLabel}
              changeLabel={this.changeLabel}
              saveLabel={this.saveLabel}
              setGuiLabelTab={tab => this.setState({guiLabelTab: tab})}
            />
          </div>

          <div>  _____________________________________</div>

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

        <div>
            <div>
              <button
                onClick={e=>{
                  this.setState({guiInfoTab: "PERSONAL"})
                  e.preventDefault();
                }}
              >
                Persoonlijke tips voor een beter label
              </button>
              <button
                onClick={e=>{
                  this.setState({guiInfoTab: "CALCULATION"})
                  e.preventDefault();
                }}
              >
                Uitleg berekening
              </button>
              <button
                onClick={e=>{
                  this.setState({guiInfoTab: "WHY"})
                  e.preventDefault();
                }}
              >
                Waarom het waterlabel?
              </button>
            </div>
            <div>
              <div
                style={this.state.guiInfoTab==="PERSONAL"? {} : {display: "none"}}
              >
                Personal text
              </div>
              <div
                style={this.state.guiInfoTab==="CALCULATION"? {} : {display: "none"}}
              >
                CALCULATION X Y
              </div>
              <div
                style={this.state.guiInfoTab==="WHY"? {} : {display: "none"}}
              >
                WHY DID WE MAKE WATER LABEL ??
              </div>
              {/* {this.state.guiInfoTab==="PERSONAL"?
              <div>
                Personal text
              </div>
              :
              null
              }
              {this.state.guiInfoTab==="CALCULATION"?
              <div>
                CALCULATION text
              </div>
              :
              null
              }
              {this.state.guiInfoTab==="WHY"?
              <div>
                WHY text
              </div>
              :
              null
              } */}
            </div>
        </div>

      </div>
    );
  };
}

export default App;
