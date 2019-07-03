import React from 'react';
import './App.css';
import labelsImage from './img/labels.png';
import Header from "./Header";
import YoutubeModal from './YoutubeModal';
import SearchAddressForm from './SearchAddressForm';
import SelectAddressFromList from "./SelectAddressFromList";
import LabelForm from "./LabelForm";
import InfoTabs from "./InfoTabs";
import SaveModal from "./SaveModal";

export default AppRender;
function AppRender (props) {

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
    
    fetchAssetTypes,
    fetchBuildings,
    fetchWaterlabelsFromBuilding,
    createNewLabel,
    changeLabel,
    openSaveModal,
    saveLabel,
    setEditedWaterlabel,
    fetchComputedLabel,
    editingWaterlabelReady,
    setShowLabelFormDetails,
    backToAddressSearchForm,
    setGuiShowVideo,
    setSearchCity,
    setSearchPostcode,
    setSearchStreet,
    setSearchNumber,
    setSearchAddition,
    setSearchOnCityStreet,
    selectAddress,
    setGuiLabelTab,
    setEmail,
    setGuiShowEmail,
    closeSaveModal,
    setGuiInfoTab,

  } = props;

  return (
    <div
    className="App"
    >
      <SearchAddressForm
        foundAddressesList={foundAddressesList}
        assetTypeFetchState={assetTypeFetchState}
        searchAddressState={searchAddressState}
        setGuiShowVideo={setGuiShowVideo}
        setSearchOnCityStreet={setSearchOnCityStreet}
        searchOnCityStreet={searchOnCityStreet}
        setSearchCity={setSearchCity}
        searchCity={searchCity}
        setSearchStreet={setSearchStreet}
        searchStreet={searchStreet}
        setSearchPostcode={setSearchPostcode}
        searchPostcode={searchPostcode}
        setSearchNumber={setSearchNumber}
        searchNumber={searchNumber}
        setSearchAddition={setSearchAddition}
        searchAddition={searchAddition}
        fetchBuildings={fetchBuildings}
      />
      <YoutubeModal
        guiShowVideo ={guiShowVideo}
        setGuiShowVideo={setGuiShowVideo}
      />
      <SaveModal
        guiShowEmail={guiShowEmail}
        guiShowSuccesSave={guiShowSuccesSave}
        saveWaterlabelState={saveWaterlabelState}
        email={email}
        setEmail={email=>setEmail(email)}
        setGuiHideEmail={()=>setGuiShowEmail(false)}
        saveLabel={saveLabel}
        closeModal={()=>{
          closeSaveModal();
        }}
      />   
      <Header
        foundAddressesList={foundAddressesList}
        backToAddressSearchForm={backToAddressSearchForm}
        selectedAddress={selectedAddress}
      />
      <SelectAddressFromList
        foundAddressesList={foundAddressesList}
        selectedAddress={selectedAddress}
        searchAddressState={searchAddressState}
        selectAddress={address=>{
          selectAddress(address);
        }}
      />
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
          <button
            className="StandardButton StandardTile NewButton"
            onClick={ e =>{
              e.preventDefault();
              createNewLabel();
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
      }
       {/*_______________________________________ SAVE BUTTON */}
      {
      editedFinishedWaterlabel ?
      <div>
        <button
          onClick={e=>{
            e.preventDefault();
            openSaveModal();
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
          <LabelForm
            assetTypesFromServer={assetTypesFromServer}
            latestWaterlabel={latestWaterlabel}
            editedWaterlabel={editedWaterlabel}
            editedFinishedWaterlabel={editedFinishedWaterlabel}
            guiLabelTab={guiLabelTab}
            showLabelFormDetails={showLabelFormDetails}
            setShowLabelFormDetails={bool=>setShowLabelFormDetails(bool)}
            createNewLabel={createNewLabel}
            changeLabel={changeLabel}
            setGuiLabelTab={tab => setGuiLabelTab(tab)}
            setEditedWaterlabel={setEditedWaterlabel}
            editingWaterlabelReady={editingWaterlabelReady}
            computedWaterlabelState={computedWaterlabelState}
            computedWaterlabel={computedWaterlabel}
          />
        </div>
        :
        null
        }
      </form>
         
      {/*_______________________________________ INFO TABS */}
      <div
        style={selectedAddress===null? {display:"none"}:{}}
        className="InfoTabContainer"
      >
        <InfoTabs
          setInfoTab={tab=>setGuiInfoTab(tab)}
          guiInfoTab={guiInfoTab}
        />
      </div> 
    </div>
  );
}