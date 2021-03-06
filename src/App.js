import React,  { Component } from 'react';

import AppRender from './AppRender';
import {copyLabelData, copyLabelDataWithoutNullCategories, setAssetCategories} from "./utils/labelFunctions";


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
      // // searchNumber: "20",//"36",
      // searchNumber: "",//"36",
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
      guiShowBackModal: false,
      guiShowSuccesSave: false,
      guiLabelTab: null,//"Dak", // "Tuin", "Voorziening"
      guiInfoTab: null,//"PERSONAL", // "CALCULATION", "WHY"

      buildingGeoJSON: {
        type: "Polygon",
        coordinates: [],
      },
      surroundingBuildings: [],
    };

    this.fetchAssetTypes();
    
    // window.addEventListener("beforeunload", this.confirmLeave);
  };

  confirmLeave = (event) => {
    const questionString = 'Weet u zeker dat u het waterlabel niet wilt opslaan?';
    if (this.state.editedWaterlabel || this.state.editedFinishedWaterlabel) {
      event.returnValue = questionString;
      return questionString;
    }
  }

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

    const postcodeNoSpaces = searchPostcode.split(' ').join('')

    const url = 
      searchOnCityStreet ?
      `/api/v2/buildings/?city=${searchCity}&street=${searchStreet}&housenumber=${searchNumber}&page_size=1000000`
      :
      `/api/v2/buildings/?postalcode=${postcodeNoSpaces}&housenumber=${searchNumber}&page_size=1000000`;

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      const foundBuildingList = (parsedJSON.results && parsedJSON.results.length)? parsedJSON.results : [];
      const unFlatFoundAddressesList = foundBuildingList.map( building => {
        return building.houseaddresses.map(address => {
          address.building = building.id;
          return address;
        })
      });
      const foundAddressesList = [].concat.apply([], unFlatFoundAddressesList);
      const buildingGeoJSON = parsedJSON.results[0].geometry;
      
      that.setState(
        {
        searchAddressState: "RECEIVED",
        // foundAddressesList: (parsedJSON.results && parsedJSON.results.length)? parsedJSON.results : [],
        foundAddressesList: foundAddressesList,
        selectedAddress: (((foundAddressesList).length === 1 )? foundAddressesList[0] : null),
        buildingGeoJSON: buildingGeoJSON,
        // currentWaterLabels: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0].waterlabels : [],
        // latestWaterlabel: (parsedJSON.results && parsedJSON.results.length === 1 )? parsedJSON.results[0].waterlabels[0] : null
        }
        ,( _ => that.fetchWaterlabelsFromBuilding())
      )
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

    
    fetch( `/api/v2/waterlabels/?building=${this.state.selectedAddress.building}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(parsedJSON) {
      const preppedWaterlabels = parsedJSON.results.map(waterlabel=>{
        waterlabel.assets = setAssetCategories(waterlabel.assets, that.state.assetTypesFromServer);
        return waterlabel;
      })
      const preppedWaterLabelsNewestFirst = preppedWaterlabels.sort((a,b)=>{
        if (a.timestamp > b.timestamp) {
          return -1;
        } else if (a.timestamp < b.timestamp) {
          return 1;
        } else {
          return 0;
        }
      })
      that.setState({
        fetchWaterlabelState: "RECEIVED",
        currentWaterLabels: preppedWaterLabelsNewestFirst,
        latestWaterlabel: preppedWaterLabelsNewestFirst[0] || null, // assume first one from api is latest waterlabel
      })
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
      this.state.latestWaterlabel?
      {assets: copyLabelData(this.state.latestWaterlabel).assets}
      :
      {assets: []};

    this.setState({
      editedWaterlabel: waterlabelToChange,
      // comment this out so when someone first makes change then does "klaar"
      // then does second change then does "annuleer" first change is not annulleert
      // editedFinishedWaterlabel: null
    },
    (_ => {
      this.fetchComputedLabel(this.state.editedWaterlabel);
    }))
  }
  openSaveModal = (callBack) => {
    // this.saveLabel();
    this.setState({
      guiShowEmail: true,
    },
    callBack && callBack
    )
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
          building: this.state.selectedAddress.building,
          email: this.state.email,
        }),
      }
    )
    .then(function(response) {
      if (response.status !== 201) {
        throw new Error("waterlabel save status not 201: " + response.status);
      }
      return response.json();
    })
    .then(function(parsedJSON) {
      that.setState({
        saveWaterlabelState: "RECEIVED",
        guiShowSuccesSave: true,
        guiShowEmail: false,
      });
      that.fetchWaterlabelsFromBuilding();
    })
    .catch(error => {
      that.setState({saveWaterlabelState: "FAILED"})
      console.error('Error:', error);

    });
  }
  setEditedWaterlabel = (newLabel, callBack) => {
    this.setState(
      {editedWaterlabel: newLabel},
      (_ => {
        this.fetchComputedLabel(this.state.editedWaterlabel);
        callBack && callBack();
      })
    )
  }
  fetchComputedLabel = (label) => {
    // the computation endpoint cannot handle zero assets
    // this is for now the best place to check on this since it is called at plenty of places
    if (
      !label
      ||
      label.assets
        .filter(asset => asset.asset_type !== null)
        .reduce((acc, curr)=>acc+((parseInt(curr.area) || 0)), 0 )
         === 0
    )
    {
      this.setState({
        computedWaterlabel: null,
      })
      return;
    }
    this.setState({computedWaterlabelState: "SEND"});

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
          building: this.state.selectedAddress.building,
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
    })
    .catch(error => {
      that.setState({computedWaterlabelState: "FAILED"})
      console.error('Error:', error);

    });
  }
  editingWaterlabelReady = (guiLabelTab) => {
    let finishedWaterlabel = copyLabelDataWithoutNullCategories(this.state.editedWaterlabel);
    finishedWaterlabel.code = this.state.computedWaterlabel && this.state.computedWaterlabel.code;
    finishedWaterlabel.building = this.state.selectedAddress.building;
    // email is set In later state ! only pass it to the api
    // finishedWaterlabel.email = this.state.email;

    this.setState({
      editedFinishedWaterlabel: finishedWaterlabel,
      editedWaterlabel: null,
      guiLabelTab: guiLabelTab,
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
      guiLabelTab: null,
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
  selectAddress = (address, callback) => {
    this.setState(
      {selectedAddress: address},
      (_=>{
        callback && callback();
        this.fetchWaterlabelsFromBuilding();
      })
    )
  }
  setShowLabelFormDetails = (bool) => {
    this.setState({showLabelFormDetails: bool});
  }
  setGuiLabelTab = (tab, callback) => {
    if (this.state.editedWaterlabel === null) {
      this.changeLabel();
    }
    this.setState({guiLabelTab:tab}, callback);
  }
  setGuiLabelTabDesktop = (tab, callback) => {
    // if (this.state.editedWaterlabel === null) {
    //   this.changeLabel();
    // }
    this.setState({guiLabelTab:tab}, callback);
  }
  setEmail = (email) => {
    this.setState({email: email});
  }
  setGuiShowEmail = (bool) => {
    this.setState({guiShowEmail: bool})
  }
  closeSaveModal = (callBack) => {
    this.setState({
      saveWaterlabelState: "NOT_SEND",
      guiShowSuccesSave: false,
      guiShowEmail: false,
      editedWaterlabel: null,
      editedFinishedWaterlabel: null,
      computedWaterlabel: null,
    },
    callBack
    );
  }
  setGuiInfoTab = (tab, callback) => {
    this.setState({guiInfoTab: tab}, callback);
  }

  setGuiShowBackModal = (bool) => {
    this.setState({guiShowBackModal: bool})
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
      guiShowBackModal,
    } = this.state;

    return (
        <AppRender
          assetTypesFromServer={assetTypesFromServer}
          assetTypeFetchState={assetTypeFetchState}
          searchPostcode={searchPostcode}
          searchStreet={searchStreet}
          searchNumber={searchNumber}
          searchAddition={searchAddition}
          searchCity={searchCity}
          searchOnCityStreet={searchOnCityStreet}
          searchAddressState={searchAddressState}
          foundAddressesList={foundAddressesList}
          selectedAddress={selectedAddress}
          fetchWaterlabelState={fetchWaterlabelState}
          currentWaterLabels={currentWaterLabels}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          showLabelFormDetails={showLabelFormDetails}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          saveWaterlabelState={saveWaterlabelState}
          computedWaterlabelState={computedWaterlabelState}
          computedWaterlabel={computedWaterlabel}
          email={email}
          guiShowVideo={guiShowVideo}
          guiShowEmail={guiShowEmail}
          guiShowSuccesSave={guiShowSuccesSave}
          guiLabelTab={guiLabelTab}
          guiInfoTab={guiInfoTab}
          
          fetchAssetTypes={this.fetchAssetTypes}
          fetchBuildings={this.fetchBuildings}
          fetchWaterlabelsFromBuilding={this.fetchWaterlabelsFromBuilding}
          createNewLabel={this.createNewLabel}
          changeLabel={this.changeLabel}
          openSaveModal={this.openSaveModal}
          saveLabel={this.saveLabel}
          setEditedWaterlabel={this.setEditedWaterlabel}
          fetchComputedLabel={this.fetchComputedLabel}
          editingWaterlabelReady={this.editingWaterlabelReady}
          setShowLabelFormDetails={this.setShowLabelFormDetails}
          backToAddressSearchForm={this.backToAddressSearchForm}
          setGuiShowVideo={this.setGuiShowVideo}
          setSearchCity={this.setSearchCity}
          setSearchPostcode={this.setSearchPostcode}
          setSearchStreet={this.setSearchStreet}
          setSearchNumber={this.setSearchNumber}
          setSearchAddition={this.setSearchAddition}
          setSearchOnCityStreet={this.setSearchOnCityStreet}
          selectAddress={this.selectAddress}
          setGuiLabelTab={this.setGuiLabelTab}
          setGuiLabelTabDesktop={this.setGuiLabelTabDesktop}
          setEmail={this.setEmail}
          setGuiShowEmail={this.setGuiShowEmail}
          closeSaveModal={this.closeSaveModal}
          setGuiInfoTab={this.setGuiInfoTab}
          guiShowBackModal={guiShowBackModal}
          setGuiShowBackModal={this.setGuiShowBackModal}
          buildingGeoJSON={this.state.buildingGeoJSON}
          surroundingBuildings={this.state.surroundingBuildings}
        />
    );
  };
}

export default App;
