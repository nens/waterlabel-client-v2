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
import LoadingIcon from "./LoadingIcon";
import dakImage from './img/dak.svg';
import tuinImage from './img/tuin.svg';
import voorzieningImage from './img/voorziening.svg';
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions'


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
          tileClassName={"TileTuin"}
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
          tileClassName={"TileDak"}
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
          tileClassName={"TileVoorziening"}
        />

        {/* _______________________________________ */}
        <div  className="Tile PersonalTile"
          style={
            selectedAddress === null ?
            {display: "none"}
            :
            {marginTop: "50px"}
          }
        >
          <button
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "PERSONAL") {
                setGuiInfoTab("PERSONAL", _ => {
                  const elmnt = document.getElementsByClassName("PersonalTile")[0];
                  scrollElementIntoViewWorkaround(elmnt);
                });
              }
              else {
                setGuiInfoTab(null);
              }
            }}
            className={
              guiInfoTab === "PERSONAL" ? "TabActive Tab" : "Tab TabInActive" 
            }
          >
            <span>{"Persoonlijke tips voor een beter label"}</span>
          </button>
          <div
            className="InfoPage"
          >
            <p>
              Persoonlijke tips zijn nog niet beschikbaar
            </p>
          </div>
        </div>
        {/* _______________________________________ */}
        {/* _______________________________________ */}
        <div  className="Tile CalculationTile"
          style={
            selectedAddress === null ?
            {display: "none"}
            :
            {}
          }
        >
          <button
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "CALCULATION") {
                setGuiInfoTab("CALCULATION", _ => {
                  const elmnt = document.getElementsByClassName("CalculationTile")[0];
                  scrollElementIntoViewWorkaround(elmnt);
                });
              }
              else {
                setGuiInfoTab(null);
              }
            }}
            className={
              guiInfoTab === "CALCULATION" ? "TabActive Tab" : "Tab TabInActive" 
            }
          >
            <span>{"Uitleg berekening"}</span>
          </button>
          <div
            className="InfoPage"
          >
            <p>
              Uitleg van de berekening is momenteel nog niet beschikbaar.
            </p>
          </div>
        </div>
        {/* _______________________________________ */}
        {/* _______________________________________ */}
        <div  className="Tile WhyTile"
          style={
            selectedAddress === null ?
            {display: "none"}
            :
            {}
          }
        >
          <button
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "WHY") {
                setGuiInfoTab("WHY", _ => {
                  const elmnt = document.getElementsByClassName("WhyTile")[0];
                  scrollElementIntoViewWorkaround(elmnt);
                });
              }
              else {
                setGuiInfoTab(null);
              } 
                   
            }}
            className={
              guiInfoTab === "WHY" ? "TabActive Tab" : "Tab TabInActive" 
            }
          >
            <span>{"Waarom het waterlabel?"}</span>
          </button>
          <div
            className="InfoPage"
          >
            <p>
            Hevige neerslag gaat steeds vaker voorkomen. Om de wateroverlast in de stad te beperken moet de overheid maatregelen nemen. Ook burgers kunnen maatregelen treffen om hun stad klimaatbestendiger te maken. Om de burger bewuster te maken is het regenwaterlabel, kortweg waterlabel, voor woningen ontwikkeld. Het waterlabel geeft informatie over de capaciteit van een huis / tuin om water vast te houden. Dit label is een initiatief van De Waag, de gemeente Rotterdam en Huisje Boompje Beter.
            </p>
          </div>
        </div>
        {/* _______________________________________ */}
        
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