import React from 'react';
import './App.css';
import Header from "./Header";
import YoutubeModal from './YoutubeModal';
import SearchAddressForm from './SearchAddressForm';
import SelectAddressFromList from "./SelectAddressFromList";
import LabelForm from "./LabelForm";
import LabelFormMobile from "./LabelFormMobile";
import LabelFormTileMobile from "./LabelFormTileMobile";
import InfoTabs from "./InfoTabs";
import SaveModal from "./SaveModal";
import CurrentLabel from "./CurrentLabel";
import dakImage from './img/dak.svg';
import tuinImage from './img/tuin.svg';
import voorzieningImage from './img/voorziening.svg';


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
      
      <Header
        foundAddressesList={foundAddressesList}
        backToAddressSearchForm={backToAddressSearchForm}
        selectedAddress={selectedAddress}
      />
      <div
        className={
          foundAddressesList.length === 0 
          ?
          "BodyHide" 
          : 
          "Body"
        }
      >
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
        <div
          className="Tile"
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
              selectAddress(address);
            }}
          />
        </div>
        <div
          className="Tile"
        >
          <CurrentLabel
            selectedAddress={selectedAddress}
            latestWaterlabel={latestWaterlabel}
            editedWaterlabel={editedWaterlabel}
            computedWaterlabel={computedWaterlabel}
            editedFinishedWaterlabel={editedFinishedWaterlabel}
          />
        </div>
        <button
          className="Button StandardButton NewButton"
          onClick={ e =>{
            e.preventDefault();
            createNewLabel();
          }}
          style={
            (
            selectedAddress !== null &&
            latestWaterlabel === null &&
            editedWaterlabel === null &&
            editedFinishedWaterlabel === null &&
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
        <button
          className="Button StandardButton NewButton"
          onClick={e=>{
            e.preventDefault();
            openSaveModal();
          }}
          style={
            editedFinishedWaterlabel &&
            !editedWaterlabel ?
            {}
            :
            {display: "none"}
          }
        >
          LABEL OPSLAAN
        </button>
        {/* <div
          className="Tile"
          style={
            assetTypeFetchState === "RECEIVED" &&
            ( latestWaterlabel || editedWaterlabel || editedFinishedWaterlabel ) &&
            (
            guiLabelTab === "Dak" ||
            guiLabelTab === null 
            )
            ?
            {}
            :
            {display: "none"}
          }
        >
          <button
            onClick={e=>{
              e.preventDefault();
              setGuiLabelTab("Dak");
              changeLabel();          
            }}
            className={
              guiLabelTab === "Dak" ? "TabActive Tab" : "Tab TabInActive" 
            }
          >
            <span>
              <img src={dakImage} width="36px"/>
            </span>
            <span>Mijn dak</span>
            <span
              className="PlusIcon"
            >
              +
            </span>
          </button>
          <div>
            <LabelFormMobile
              assetTypesFromServer={assetTypesFromServer}
              latestWaterlabel={latestWaterlabel}
              editedWaterlabel={editedWaterlabel}
              editedFinishedWaterlabel={editedFinishedWaterlabel}
              guiLabelTab={"Dak"}
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
        </div> */}
        <LabelFormTileMobile
          assetTypeFetchState={assetTypeFetchState}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          guiLabelTab={guiLabelTab}
          setGuiLabelTab={setGuiLabelTab}
          changeLabel={changeLabel}
          assetTypesFromServer={assetTypesFromServer}
          showLabelFormDetails={showLabelFormDetails}
          setShowLabelFormDetails={setShowLabelFormDetails}
          createNewLabel={createNewLabel}
          setEditedWaterlabel={setEditedWaterlabel}
          editingWaterlabelReady={editingWaterlabelReady}
          computedWaterlabelState={computedWaterlabelState}
          computedWaterlabel={computedWaterlabel}

          tabImage={tuinImage}
          tabText={"Mijn tuin"}
          TabName={"Tuin"}
        />
        <LabelFormTileMobile
          assetTypeFetchState={assetTypeFetchState}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          guiLabelTab={guiLabelTab}
          setGuiLabelTab={setGuiLabelTab}
          changeLabel={changeLabel}
          assetTypesFromServer={assetTypesFromServer}
          showLabelFormDetails={showLabelFormDetails}
          setShowLabelFormDetails={setShowLabelFormDetails}
          createNewLabel={createNewLabel}
          setEditedWaterlabel={setEditedWaterlabel}
          editingWaterlabelReady={editingWaterlabelReady}
          computedWaterlabelState={computedWaterlabelState}
          computedWaterlabel={computedWaterlabel}

          tabImage={dakImage}
          tabText={"Mijn dak"}
          TabName={"Dak"}
        />
        <LabelFormTileMobile
          assetTypeFetchState={assetTypeFetchState}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          guiLabelTab={guiLabelTab}
          setGuiLabelTab={setGuiLabelTab}
          changeLabel={changeLabel}
          assetTypesFromServer={assetTypesFromServer}
          showLabelFormDetails={showLabelFormDetails}
          setShowLabelFormDetails={setShowLabelFormDetails}
          createNewLabel={createNewLabel}
          setEditedWaterlabel={setEditedWaterlabel}
          editingWaterlabelReady={editingWaterlabelReady}
          computedWaterlabelState={computedWaterlabelState}
          computedWaterlabel={computedWaterlabel}

          tabImage={voorzieningImage}
          tabText={"Mijn voorzieningen"}
          TabName={"Voorziening"}
        />
        
      </div>
      
      
      
      
       {/*_______________________________________ SAVE BUTTON */}
      {/* {
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
      } */}

      {/*_______________________________________ WATERLABEL TAB + FROM */}
      {/* <form>
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
          */}
      {/*_______________________________________ INFO TABS */}
      {/* <div
        style={selectedAddress===null? {display:"none"}:{}}
        className="InfoTabContainer"
      >
        <InfoTabs
          setInfoTab={tab=>setGuiInfoTab(tab)}
          guiInfoTab={guiInfoTab}
        />
      </div>  */}
    </div>
  );
}