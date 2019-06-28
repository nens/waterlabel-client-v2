import React,  { Component } from 'react';
import './App.css';

import LabelForm from "./LabelForm";
import InfoTabs from "./InfoTabs";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      assetTypesFromServer: [],
      assetTypeFetchState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"

      searchPostcode: "1188AL",
      searchStreet: "",
      searchNumber: "20",//"36",
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
      editedFinishedWaterlabel: null,
      saveWaterlabelState:  "NOT_SEND", // "SEND", "RECEIVED", "FAILED"

      computedWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      computedWaterlabel: null,

      email: "",
      waterlabelSaved: "NOT_SEND", // "SEND", "RECEIVED" , "FAILED"
      
      guiShowVideo: false,
      guiShowEmail: false,
      guidShowSuccesSave: false,
      guiEditLabel: false,
      guiLabelTab: "Dak", // "Tuin", "Voorziening"
      guiInfoTab: "PERSONAL", // "CALCULATION", "WHY"
    };

    this.fetchAssetTypes();
  };

  fetchAssetTypes = () => {
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

  fetchBuildings = () => {

    this.setState({searchAddressState: "SEND"});

    const that = this;

    const postcode = this.state.searchPostcode;
    const number = this.state.searchNumber;
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

  fetchWaterlabelsFromBuilding = () => {
    // if adddress is not selected return;
    if (!this.state.selectedAddress) return;

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

  createNewLabel = () => {
    this.setState({
      editedWaterlabel: {assets: []},
    },
    (_ => {
      this.fetchComputedLabel(this.state.editedWaterlabel);
    }))
  }
  changeLabel = () => {

    const waterlabelToChange = this.state.editedFinishedWaterlabel ? 
      {assets:  JSON.parse(JSON.stringify(this.state.editedFinishedWaterlabel.assets))}
      :
      {assets: JSON.parse(JSON.stringify(this.state.latestWaterlabel.assets))};

    this.setState({
      editedWaterlabel: waterlabelToChange,
      editedFinishedWaterlabel: null
    },
    (_ => {
      this.fetchComputedLabel(this.state.editedWaterlabel);
    }))
  }

  openSaveModal = () => {
    // this.saveLabel();
    this.setState({
      guiShowEmail: true,
    })
  }

  saveLabel = () => {
    this.setState({saveWaterlabelState: "SEND"});

    const that = this;

    
    fetch( 
      `/api/v2/waterlabels/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: this.state.editedFinishedWaterlabel.assets,
          building: this.state.selectedAddress.id,
          email: this.state.email,
        }),
      }
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        saveWaterlabelState: "RECEIVED",
        guidShowSuccesSave: true,
        guidShowEmail: false,
        // currentWaterLabels: parsedJSON.results,
        // latestWaterlabel: parsedJSON.results[0], // assume first one from api is latest waterlabel
      });
      console.log(JSON.stringify(parsedJSON));
      that.fetchWaterlabelsFromBuilding();
    })
    .catch(error => {
      that.setState({saveWaterlabelState: "FAILED"})
      console.error('Error:', error);

    });
  }

  setEditedWaterlabel = (newLabel) => {
    this.setState(
      {editedWaterlabel: newLabel},
      (_ => {
        this.fetchComputedLabel(this.state.editedWaterlabel);
      })
    )
  }

  fetchComputedLabel = (label) => {
    // the computation endpoint cannot handle zero assets
    // this is for now the best place to check on this since it is called at plenty of places
    if (label.assets.length === 0) {
      return;
    }
    this.setState({computedWaterlabelState: "SEND"});
    console.log('fetchComputedLabel label', label);

    const that = this;
    fetch( 
      `/api/v2/waterlabels/compute/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assets: label.assets,
        }),
      }
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        computedWaterlabelState: "RECEIVED",
        computedWaterlabel: parsedJSON,
      })
      console.log(JSON.stringify(parsedJSON));
    })
    .catch(error => {
      that.setState({computedWaterlabelState: "FAILED"})
      console.error('Error:', error);

    });
  }

  editingWaterlabelReady = () => {
    let finishedWaterlabel = JSON.parse(JSON.stringify(this.state.editedWaterlabel));
    finishedWaterlabel.code = this.state.computedWaterlabel && this.state.computedWaterlabel.code;
    finishedWaterlabel.building = this.state.selectedAddress.id;
    // email is set In later state ! only pass it to the api
    // finishedWaterlabel.email = this.state.email;

    this.setState({
      editedFinishedWaterlabel: finishedWaterlabel,
      editedWaterlabel: null,
    })
  }

  render  = () => {

    const {
      assetTypesFromServer,
      assetTypeFetchState, // "SEND", "RECEIVED", "FAILED"

      searchPostcode,
      searchStreet,
      searchNumber,
      searchAddition,
      searchCity,

      searchOnCityStreet,
      searchAddressState, // "SEND", "RECEIVED", "FAILED"
      foundAddressesList,
      selectedAddress,
      
      fetchWaterlabelState, // "SEND", "RECEIVED", "FAILED"
      currentWaterLabels,
      latestWaterlabel,
      editedWaterlabel,
      editedFinishedWaterlabel,
      saveWaterlabelState, // "SEND", "RECEIVED", "FAILED"

      computedWaterlabelState, // "SEND", "RECEIVED", "FAILED"
      computedWaterlabel,

      email,
      waterlabelSaved, // "SEND", "RECEIVED" , "FAILED"
      
      guiShowVideo,
      guiShowEmail,
      guidShowSuccesSave,
      guiEditLabel,
      guiLabelTab, // "Tuin", "Voorziening"
      guiInfoTab, 
    } = this.state;

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

        <button
          style={ foundAddressesList.length !== 0 ? {} : {visibility:"hidden"}}
          onClick={_ =>{
            this.setState({
              foundAddressesList: [],
              selectedAddress: null,
              searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
              
              fetchWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
              currentWaterLabels: [],
              latestWaterlabel: null,
              editedWaterlabel: null,
              editedFinishedWaterlabel: null,
              saveWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"

              computedWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
              computedWaterlabel: null,

              email,
              waterlabelSaved: "NOT_SEND", // "SEND", "RECEIVED" , "FAILED"
            })
          }}
        >
          BACK
        </button>
        
        <form
          style={
            this.state.foundAddressesList.length === 0 ? {} : {display: "none"} 
          }
        >

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
        {/* </form> */}
        {/* <form> */}
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
          </div>
        </form>
        
        <form
          style={
            foundAddressesList.length !== 0 &&
            selectedAddress === null 
            ? 
            {} 
            : 
            {display: "none"} 
          }
        >
          <hr/>
          <div>
            <span>{this.state.searchAddressState}</span>
            <div>Found Addresses:</div>
            <ul>
            {
              this.state.foundAddressesList.map(address=>{
                return (
                  <li
                    key={address.houseaddresses[0].housenumber}
                    onClick={_ =>{
                      this.setState(
                        {selectedAddress: address},
                        (this.fetchWaterlabelsFromBuilding)
                      )
                    }}
                  >
                    <span>{address.houseaddresses[0].street}</span>
                    <span>{address.houseaddresses[0].housenumber}</span>
                  </li>
                );
              })
            }
            </ul>
          </div>
          </form>
          <div
            style={
              selectedAddress !== null 
              ? 
              {} 
              : 
              {display: "none"} 
            }
          >
            {/* <hr/> */}
            <div>Selected Address:</div>
            <div>
              <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].street}</span>
              <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].housenumber}</span>
            </div>
          </div>

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
        {
        latestWaterlabel && 
        !computedWaterlabel ?
        <div>
          {/* <hr/> */}
          <h3>Your label is</h3>
          <span>{latestWaterlabel.code } </span>
          {/* <span>{this.state.computedWaterlabel.code}</span> */}
        </div>
        :
        null
        }

        {
        this.state.computedWaterlabel ?
        <div>
          <hr/>
          <h3>ComputedLabel</h3>
          <span>{this.state.computedWaterlabelState } </span>
          <span>{this.state.computedWaterlabel.code}</span>
        </div>
        :
        null
        }
        {
          <div>
            <button
              onClick={ e =>{
                this.createNewLabel();
                e.preventDefault();
              }}
              style={
                selectedAddress !== null &&
                latestWaterlabel === null &&
                editedWaterlabel === null &&
                computedWaterlabel == null ?
                {}
                :
                {display: "none"}
              }
            >
              Nieuw Label
            </button>
          </div>
          
        }
        {
        this.state.editedFinishedWaterlabel ?
        <div>
          {/* <h3>ComputedLabel</h3>
          <span>{this.state.computedWaterlabelState } </span>
          <span>{this.state.computedWaterlabel.code}</span> */}
          <button
            onClick={e=>{
              // this.saveLabel();
              this.openSaveModal();
              e.preventDefault();
            }}
          >
            Label Opslaan
          </button>
        </div>
        :
        null
        }

        <form>
          {
          this.state.assetTypeFetchState === "RECEIVED" &&
          ( this.state.latestWaterlabel || this.state.editedWaterlabel || this.state.editedFinishedWaterlabel) ?

          <div>
            <hr/>
            <LabelForm
              assetTypesFromServer={this.state.assetTypesFromServer}
              latestWaterlabel={this.state.latestWaterlabel}
              editedWaterlabel={this.state.editedWaterlabel}
              editedFinishedWaterlabel={this.state.editedFinishedWaterlabel}
              guiLabelTab={this.state.guiLabelTab}

              createNewLabel={this.createNewLabel}
              changeLabel={this.changeLabel}
              // saveLabel={this.saveLabel}
              setGuiLabelTab={tab => this.setState({guiLabelTab: tab})}
              setEditedWaterlabel={this.setEditedWaterlabel}
              editingWaterlabelReady={this.editingWaterlabelReady}

              computedWaterlabelState={this.state.computedWaterlabelState}
              computedWaterlabel={this.state.computedWaterlabel}
            />
          </div>
          :
          null
          }
        </form>

        <div
          style={
            this.state.guiShowEmail | this.state.guidShowSuccesSave ?
            {}
            :
            {display: "none"}
          }
        >
          <hr/>
          <form
            style={
              this.state.saveWaterlabelState !== "RECEIVED" ?
              {}
              :
              {display: "none"} // should not edit qq
            }
          >
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
            <div
              // style={
              //   this.state.saveWaterlabelState === "SEND" ?
              //   {}
              //   :
              //   { visibility: "hidden"} // should not edit qq
              // }
            >
              {this.state.saveWaterlabelState + ''}
            </div>
            <div>
              <button
                onClick={e=>{
                  this.setState({guiShowEmail: false});
                  e.preventDefault();
                }}
              >
                Annuleer
              </button>
              <button
                onClick={e=>{
                  this.saveLabel();
                  e.preventDefault();
                }}
              >
                Verzend
              </button>
            </div>
          </form>
          <form
            style={
              this.state.saveWaterlabelState === "RECEIVED" ?
              {}
              :
              {display: "none"} // should not edit qq
            }
          >
            <button
                onClick={e=>{
                  // this.saveLabel();
                  this.setState({
                    saveWaterlabelState: "NOT_SEND",
                    guidShowSuccesSave: false,
                    editedWaterlabel: null,
                    editedFinishedWaterlabel: null,
                    computedWaterlabel: null,
                  })
                  e.preventDefault();
                }}
              >
              Terug
            </button>
          </form>
        </div>

        <div
          style={selectedAddress===null? {display:"none"}:{}}
        >
          <InfoTabs
            setInfoTab={tab=>this.setState({guiInfoTab: tab})}
            guiInfoTab={guiInfoTab}
          />
        </div> 
      </div>
    );
  };
}

export default App;
