import React,  { Component } from 'react';
import './App.css';

import SelectAddressFromList from "./SelectAddressFromList";
import LabelForm from "./LabelForm";
import InfoTabs from "./InfoTabs";
import SaveModal from "./SaveModal";
import {copyLabelData, setAssesCategories} from "./utils/labelFunctions";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assetTypesFromServer: [],
      assetTypeFetchState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      // searchPostcode: "",
      // searchStreet: "",
      // searchNumber: "",
      // searchAddition: "",
      // searchCity: "",
      // email: "",
      searchPostcode: "1188AL",
      searchStreet: "KABELWEG",
      searchCity: "AMSTERDAM",
      searchNumber: "20",//"36",
      searchAddition: "",
      email: "1231@32132.COM",

      searchOnCityStreet: false,
      searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      foundAddressesList: [],
      selectedAddress: null,
      fetchWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      currentWaterLabels: [],
      latestWaterlabel: null,
      editedWaterlabel: null,
      newAssetType: null,

      editedFinishedWaterlabel: null,
      saveWaterlabelState:  "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      computedWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      computedWaterlabel: null,
      guiShowVideo: false,
      guiShowEmail: false,
      guiShowSuccesSave: false,
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

    const {
      searchCity,
      searchStreet,
      searchNumber,
      searchPostcode,
      searchOnCityStreet,
    } = this.state;

    const url = 
      searchOnCityStreet ?
      `/api/v2/buildings/?city=${searchCity}&street=${searchStreet}&housenumber=${searchNumber}&page_size=1000000`
      :
      `/api/v2/buildings/?postalcode=${searchPostcode}&housenumber=${searchNumber}&page_size=1000000`;

    fetch(url)
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
      const preppedWaterlabels = parsedJSON.results.map(waterlabel=>{
        waterlabel.assets = setAssesCategories(waterlabel.assets, that.state.assetTypesFromServer);
        return waterlabel;
      })
      that.setState({
        fetchWaterlabelState: "RECEIVED",
        currentWaterLabels: preppedWaterlabels,
        latestWaterlabel: preppedWaterlabels[0] || null, // assume first one from api is latest waterlabel
      })
      console.log(JSON.stringify(preppedWaterlabels));
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
      {assets:  copyLabelData(this.state.editedFinishedWaterlabel).assets}
      :
      {assets: copyLabelData(this.state.latestWaterlabel).assets};

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
        guiShowSuccesSave: true,
        guiShowEmail: false,
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
    if (label.assets.filter(asset => asset.asset_type !== null).length === 0 ) {
      this.setState({
        computedWaterlabel: null,
      })
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
    let finishedWaterlabel = copyLabelData(this.state.editedWaterlabel);
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
      newAssetType,
      
      editedFinishedWaterlabel,
      saveWaterlabelState, // "SEND", "RECEIVED", "FAILED"

      computedWaterlabelState, // "SEND", "RECEIVED", "FAILED"
      computedWaterlabel,

      email,
      
      guiShowVideo,
      guiShowEmail,
      guiShowSuccesSave,
      guiLabelTab, // "Tuin", "Voorziening"
      guiInfoTab, 
    } = this.state;

    return (
      <div className="App">

        {/*_______________________________________ OVERVIEW ALL ASSETS */}
        {/* 
        <div>
          <span>assetTypeFetchState: </span>
          {assetTypeFetchState}
        <ul>
          {assetTypesFromServer.map(asset=>
            <li>{asset.name}</li>
          )}
        </ul>
        </div> 
        */}

        {/*_______________________________________ BACK BUTTON */}
        <button
          style={ foundAddressesList.length !== 0 ? {} : {visibility:"hidden"}}
          onClick={_ =>{
            this.setState({
              foundAddressesList: [],
              selectedAddress: null,
              searchAddressState: "NOT_SEND",   
              
              fetchWaterlabelState: "NOT_SEND",   
              currentWaterLabels: [],
              latestWaterlabel: null,
              editedWaterlabel: null,
              editedFinishedWaterlabel: null,
              saveWaterlabelState: "NOT_SEND",  

              computedWaterlabelState: "NOT_SEND",  
              computedWaterlabel: null,

              email,
              guiShowVideo: false,
              guiShowEmail: false,
              guiShowSuccesSave: false,
            })
          }}
        >
          BACK
        </button>
        {/* _____________________________________ SHOW VIDEO */}
        <div
          style={guiShowVideo? {}: {display:"none"}}
        >
          <hr/>
          <div>
              Link to Youtube !!!
          </div>
          <button
            onClick={e=>{
              e.preventDefault();
              this.setState({guiShowVideo:false})
            }}
          >
            X
          </button>
          <hr/>
        </div>
        
        {/*_______________________________________ SEARCH ADDDRESS FORM */}
        <form
          style={
            foundAddressesList.length === 0 &&
            assetTypeFetchState === "RECEIVED" ? 
            {} : {display: "none"} 
          }
        >
          <button
            onClick={e=>{
              e.preventDefault();
              this.setState({guiShowVideo:true})
            }}
          >
            Show Video
          </button>

          <div
            style={
              searchOnCityStreet===true ? {} : {display: "none"} 
            }
          >
            <label htmlFor="searchCity">
              Stad:
            </label>
            <input
              id="searchCity"
              value={searchCity}
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
              value={searchPostcode}
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
              value={searchStreet}
              onChange={e=>this.setState({searchStreet: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="searchNumber">
              Nummer:
            </label>
            <input
              id="searchNumber"
              value={searchNumber}
              onChange={e=>this.setState({searchNumber: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="searchAddition">
              Toevoeging:
            </label>
            <input
              id="searchAddition"
              value={searchAddition}
              onChange={e=>this.setState({searchAddition: e.target.value})}
            />
          </div>
          <div>
            <button
              style={
                searchOnCityStreet===false ? {} : {display: "none"} 
              }
              onClick={ e => {
                e.preventDefault();
                this.setState({searchOnCityStreet: true})
              }}
            >
              Zoek op straat
            </button>

            <button
              style={
                searchOnCityStreet===true ? {} : {display: "none"} 
              }
              onClick={ e => {
                e.preventDefault();
                this.setState({searchOnCityStreet: false})
              }}
            >
              Zoek op postcode
            </button>
          </div>
          <div>
            <button
              onClick={ e => {
                e.preventDefault();
                this.fetchBuildings();
              }}
            >
              Zoek
            </button>
          </div>
        </form>
        
        {/*_______________________________________ LIST FOUND ADDRESSES */}
        <div
          style={
            foundAddressesList.length !== 0 &&
            selectedAddress === null 
            ? 
            {} 
            : 
            {display: "none"} 
          }
        >
          <SelectAddressFromList
            foundAddressesList={foundAddressesList}
            selectedAddress={selectedAddress}
            searchAddressState={searchAddressState}
            selectAddress={address=>{
              this.setState(
                {selectedAddress: address},
                (this.fetchWaterlabelsFromBuilding)
              )
            }}
          />
        </div>
        
        {/*_______________________________________ SELECTED ADDRESS */}
        <div
          style={
            selectedAddress !== null 
            ? 
            {} 
            : 
            {display: "none"} 
          }
        >
          <div>Selected Address:</div>
          <div>
            <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].street}</span>
            <span>{this.state.selectedAddress && this.state.selectedAddress.houseaddresses[0].housenumber}</span>
          </div>
        </div>
        
        {/*_______________________________________ FETCH WATERLABEL STATE */}
        {/* <div>
          <span>fetchWaterlabelState: </span>
          <span>{fetchWaterlabelState}</span>
          <div>
            <span>Amount waterlabel: </span>
            <span>{currentWaterLabels.length}</span>
          </div>
          <div>
            <span>Timestamp latest label: </span>
            <span>{this.state.latestWaterlabel && this.state.latestWaterlabel.timestamp}</span>
          </div>
        </div> */}

        {/*_______________________________________ LATEST WATERLABEL */}
        {
        latestWaterlabel && 
        !computedWaterlabel ?
        <div>
          <h3>Your label is</h3>
          <span>{latestWaterlabel.code } </span>
        </div>
        :
        null
        }
         {/*_______________________________________ COMPUTED WATERLABEL */}
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
        {/*_______________________________________ NEW WATERLABEL BUTTON */}
        {
          <div>
            <button
              onClick={ e =>{
                e.preventDefault();
                this.createNewLabel();
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
         {/*_______________________________________ SAVE BUTTON */}
        {
        this.state.editedFinishedWaterlabel ?
        <div>
          {/* <h3>ComputedLabel</h3>
          <span>{this.state.computedWaterlabelState } </span>
          <span>{this.state.computedWaterlabel.code}</span> */}
          <button
            onClick={e=>{
              e.preventDefault();
              this.openSaveModal();
            }}
          >
            Label Opslaan
          </button>
        </div>
        :
        null
        }

        {/*_______________________________________ WATERLABEL TAB + FROM */}
        <form>
          {
          assetTypeFetchState === "RECEIVED" &&
          ( latestWaterlabel || editedWaterlabel || editedFinishedWaterlabel) ?

          <div>
            <hr/>
            <LabelForm
              assetTypesFromServer={assetTypesFromServer}
              latestWaterlabel={latestWaterlabel}
              editedWaterlabel={editedWaterlabel}
              editedFinishedWaterlabel={editedFinishedWaterlabel}
              newAssetType={newAssetType}
              setNewAssetType={asset=> this.setState({newAssetType: asset})}
              guiLabelTab={guiLabelTab}
              createNewLabel={this.createNewLabel}
              changeLabel={this.changeLabel}
              setGuiLabelTab={tab => this.setState({guiLabelTab: tab})}
              setEditedWaterlabel={this.setEditedWaterlabel}
              editingWaterlabelReady={this.editingWaterlabelReady}
              computedWaterlabelState={computedWaterlabelState}
              computedWaterlabel={computedWaterlabel}
            />
          </div>
          :
          null
          }
        </form>
        
        {/*_______________________________________ SAVE MODAL */}
        <div
          style={
            guiShowEmail | guiShowSuccesSave ?
            {}
            :
            {display: "none"}
          }
        >
          <SaveModal
            saveWaterlabelState={saveWaterlabelState}
            email={email}
            setEmail={email=>this.setState({email: email})}
            setGuiHideEmail={()=>this.setState({guiShowEmail: false})}
            saveLabel={this.saveLabel}
            closeModal={()=>{
              this.setState({
                saveWaterlabelState: "NOT_SEND",
                guiShowSuccesSave: false,
                guiShowEmail: false,
                editedWaterlabel: null,
                editedFinishedWaterlabel: null,
                computedWaterlabel: null,
              })
            }}
          />
        </div>
        
        {/*_______________________________________ INFO TABS */}
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
