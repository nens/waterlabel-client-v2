import React,  { Component } from 'react';
import './App.css';
import playButton from './img/play-knop.svg';
import labelsImage from './img/labels.png';

import Header from "./Header";
import SelectAddressFromList from "./SelectAddressFromList";
import LabelForm from "./LabelForm";
import InfoTabs from "./InfoTabs";
import SaveModal from "./SaveModal";
import {copyLabelData, setAssesCategories} from "./utils/labelFunctions";
import YoutubeModal from './YoutubeModal';

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
      email: "",
      // searchPostcode: "1188AL",
      // searchStreet: "KABELWEG",
      // searchCity: "AMSTERDAM",
      // searchNumber: "20",//"36",
      // searchAddition: "",
      // email: "1231@32132.COM",

      searchOnCityStreet: false,
      searchAddressState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      foundAddressesList: [],
      selectedAddress: null,
      fetchWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      currentWaterLabels: [],
      latestWaterlabel: null,
      editedWaterlabel: null,
      showLabelFormDetails: false,

      editedFinishedWaterlabel: null,
      saveWaterlabelState:  "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      computedWaterlabelState: "NOT_SEND", // "SEND", "RECEIVED", "FAILED"
      computedWaterlabel: null,
      guiShowVideo: false,
      guiShowEmail: false,
      guiShowSuccesSave: false,
      guiLabelTab: null,//"Dak", // "Tuin", "Voorziening"
      guiInfoTab: null,//"PERSONAL", // "CALCULATION", "WHY"
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
    if (
      label.assets
        .filter(asset => asset.asset_type !== null)
        .reduce((acc, curr)=>acc+curr.area, 0 )
         === 0
        // .length === 0 
    )
    {
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
          assets: label.assets.map(asset=>{
            const newAsset = {
              asset_type: asset.asset_type,
              area: parseInt(asset.area,10),
              infiltration: parseInt(asset.infiltration,10),
              storage: parseInt(asset.storage,10),
              sewer_connection: asset.sewer_connection,
            };
            return newAsset;
          }),
          building: this.state.selectedAddress.id,
          email: "dummie-email_waterlabel@nelen-schuurmans.nl",
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

  setShowLabelFormDetails = (bool) => {
    this.setState({showLabelFormDetails:bool});
  }

  backToAddressSearchForm = () => {
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
      guiShowVideo: false,
      guiShowEmail: false,
      guiShowSuccesSave: false,
    })
  }

  setGuiShowVideo = (bool) => {
    this.setState({guiShowVideo:bool})
  }

  setSearchCity = (searchCity) => {
    this.setState({searchCity: searchCity})
  }

  setSearchPostcode = (searchPostcode) => {
    this.setState({searchPostcode:searchPostcode})
  }

  setSearchStreet = (searchStreet) => {
    this.setState({searchStreet:searchStreet})
  }
  setSearchNumber = (searchNumber) => {
    this.setState({searchNumber:searchNumber})
  }
  setSearchAddition = (searchAddition) => {
    this.setState({searchAddition:searchAddition})
  }
  setSearchOnCityStreet = (bool) => {
    this.setState({searchOnCityStreet:bool})
  }
  selectAddress = (address) => {
    this.setState(
      {selectedAddress: address},
      (this.fetchWaterlabelsFromBuilding)
    )
  }
  setShowLabelFormDetails = (bool) => {
    this.setState({showLabelFormDetails: bool});
  }
  setGuiLabelTab = (tab) => {
    this.setState({guiLabelTab:tab});
  }
  setEmail = (email) => {
    this.setState({email: email});
  }
  setGuiShowEmail = (bool) => {
    this.setState({guiShowEmail: bool})
  }
  closeSaveModal = () => {
    this.setState({
      saveWaterlabelState: "NOT_SEND",
      guiShowSuccesSave: false,
      guiShowEmail: false,
      editedWaterlabel: null,
      editedFinishedWaterlabel: null,
      computedWaterlabel: null,
    });
  }

  setGuiInfoTab = (tab) => {
    this.setState({guiInfoTab: tab});
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
      showLabelFormDetails,
      
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

        <Header
          foundAddressesList={foundAddressesList}
          backToAddressSearchForm={this.backToAddressSearchForm}
          selectedAddress={selectedAddress}
        />
        <YoutubeModal
          guiShowVideo ={guiShowVideo}
          setGuiShowVideo={this.setGuiShowVideo}
        />
        
        
        {/*_______________________________________ SEARCH ADDDRESS FORM */}
        <div
          className={
            foundAddressesList.length === 0 &&
            assetTypeFetchState === "RECEIVED" ? 
            "SearchAddressForm" 
            : 
            "SearchAddressForm HideSearchAddressForm"
          }
        >
        <form
        // style={
        //   foundAddressesList.length === 0 &&
        //   assetTypeFetchState === "RECEIVED" ? 
        //   {} : {display: "none"} 
        // }
        >
          <h1>Waterlabel.net</h1>
          <span>Wat doe ik tegen wateroverlast?</span>
        
          <button
            className="YoutubeButton"
            onClick={e=>{
              e.preventDefault();
              this.setGuiShowVideo(true);
            }}
          >
            <div>Kijk hier hoe het werkt</div>
            <i>
              <img src={playButton} alt="Play-Video" />
            </i>
          </button>

          <legend>
            Zoek hier naar een woning
          </legend>

          <div className="InputBlock">
          <div
            className="Row"
            style={
              searchOnCityStreet===true ? {} : {display: "none"} 
            }
          >
            <label 
              className="LabelLeft" 
              htmlFor="searchCity"
            >
              Stad
            </label>
            <input
              className="InputWholeRow"
              id="searchCity"
              value={searchCity}
              onChange={e=>this.setSearchCity( e.target.value)}
              placeholder="Bijv. Amsterdam"
            />
          </div>
          
          
            <div
              className="Row"
              style={
                searchOnCityStreet===false ? {} : {display: "none"} 
              }
            >
              <label 
                className="LabelLeft" 
                htmlFor="searchPostcode"
              >
                Postcode
              </label>
              <input
                className="InputWholeRow"
                id="searchPostcode"
                value={searchPostcode}
                onChange={e=>this.setSearchPostcode(e.target.value)}
                placeholder="1234 AB"
              />
            </div>
            
            <div
              className="Row"
              style={
                searchOnCityStreet===true ? {} : {display: "none"} 
              }
            >
              <label 
                className="LabelLeft" 
                htmlFor="searchStreet"
              >
              Straat
              </label>
              <input
                className="InputWholeRow"
                id="searchStreet"
                value={searchStreet}
                onChange={e=>this.setSearchStreet(e.target.value)}
              />
            </div>

            <div
              className="Row" 
            >
              <label 
                className="LabelLeft" 
                htmlFor="searchNumber"
              >
                Huisnr.
              </label>
              <input
                id="searchNumber"
                value={searchNumber}
                onChange={e=>this.setSearchNumber(e.target.value)}
              />
              <label
                className="LabelRight" 
                htmlFor="searchAddition">
                Toev.
              </label>
              <input
                id="searchAddition"
                value={searchAddition}
                onChange={e=>this.setSearchAddition(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className="ButtonToggleStreetPostcode"
              style={
                searchOnCityStreet===false ? {} : {display: "none"} 
              }
              onClick={ e => {
                e.preventDefault();
                this.setSearchOnCityStreet(true)
              }}
            >
              Zoek op straat
            </button>
            <button
              className="ButtonToggleStreetPostcode"
              style={
                searchOnCityStreet===true ? {} : {display: "none"} 
              }
              onClick={ e => {
                e.preventDefault();
                this.setSearchOnCityStreet(false)
              }}
            >
              Zoek op postcode
            </button>
          </div>
          {/* <div> */}
            <button
              className="ButtonSearch StandardButton"
              onClick={ e => {
                e.preventDefault();
                this.fetchBuildings();
              }}
            >
              Zoek
            </button>
            <div
              className="ErrorText"
              style={foundAddressesList.length === 0 && searchAddressState === "RECEIVED" ? {} : {display: "none"}}
            >
              <div>Onbekend adres</div>
              <div>Probeert u het nogmaals </div>
            </div>
          {/* </div> */}
        </form>
        </div>
        
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
              this.selectAddress(address);
            }}
          />
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
            <span>{latestWaterlabel && latestWaterlabel.timestamp}</span>
          </div>
        </div> */}

        {/* ______________________________________ ANY WATERLABEL VISUAL */}

        <div
          className="AnyLabelVisual StandardTile"
          style={
            selectedAddress !== null 
            ? 
            {} 
            : 
            {display: "none"} 
          }
        >
          <div 
            className="Text NoLabelYetLayOver"
            style={
              (
              selectedAddress !== null &&
              latestWaterlabel === null &&
              editedWaterlabel === null &&
              computedWaterlabel == null
              )
              ||
                (
                  editedWaterlabel && 
                  (
                    computedWaterlabel === null ||
                    ( computedWaterlabel && computedWaterlabel.detail === "The assets sum up to zero area")
                  )
                )
              ?
              {}
              :
              {display: "none"}
            }
          >
            <legend>U heeft nog geen label</legend>
          </div>
          
         
          <div 
            className="BackgroundImage"
          >   
              {/*_______________________________________ COMPUTED WATERLABEL */}
              {/*_______________________________________ LATEST WATERLABEL */}
              <div
                className="Margin"
              >
                <div
                  className="Text"
                  style={
                    computedWaterlabel ||
                    latestWaterlabel ?
                    {}
                    :
                    {visibility: "hidden"}
                  }
                >
                  {
                  computedWaterlabel ? 
                  <legend>{"Voorlopig label " + (computedWaterlabel && computedWaterlabel.code)}</legend>
                  :
                  <legend>{"U heeft label " + (latestWaterlabel && latestWaterlabel.code)}</legend>
                  }
                </div>
                <img src={labelsImage}/>
              </div>
          </div>
          
        </div>

         
        {/*_______________________________________ NEW WATERLABEL BUTTON */}
        {
          // <div

          // >
            <button
              className="StandardButton StandardTile NewButton"
              onClick={ e =>{
                e.preventDefault();
                this.createNewLabel();
              }}
              style={
                (
                selectedAddress !== null &&
                latestWaterlabel === null &&
                editedWaterlabel === null &&
                computedWaterlabel == null 
                )
                
                ?
                {}
                :
                {display: "none"}
              }
            >
              NIEUW LABEL
            </button>
          // </div>
          
        }
         {/*_______________________________________ SAVE BUTTON */}
        {
        editedFinishedWaterlabel ?
        <div>
          {/* <h3>ComputedLabel</h3>
          <span>{computedWaterlabelState } </span>
          <span>{computedWaterlabel.code}</span> */}
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
              guiLabelTab={guiLabelTab}
              showLabelFormDetails={showLabelFormDetails}
              setShowLabelFormDetails={bool=>this.setShowLabelFormDetails(bool)}
              createNewLabel={this.createNewLabel}
              changeLabel={this.changeLabel}
              setGuiLabelTab={tab => this.setGuiLabelTab(tab)}
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
            setEmail={email=>this.setEmail(email)}
            setGuiHideEmail={()=>this.setGuiShowEmail(false)}
            saveLabel={this.saveLabel}
            closeModal={()=>{
              this.closeSaveModal();
            }}
          />
        </div>
        
        {/*_______________________________________ INFO TABS */}
        <div
          style={selectedAddress===null? {display:"none"}:{}}
          className="InfoTabContainer"
        >
          <InfoTabs
            setInfoTab={tab=>this.setGuiInfoTab(tab)}
            guiInfoTab={guiInfoTab}
          />
        </div> 
      </div>
    );
  };
}

export default App;
