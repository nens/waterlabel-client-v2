import React from 'react';
import './App.css';
import Header from "./Header";
import YoutubeModal from './YoutubeModal';
import SearchAddressForm from './SearchAddressForm';
import SelectAddressFromList from "./SelectAddressFromList";
import LabelFormTileMobile from "./LabelFormTileMobile";
import LabelFormTileDesktop from "./LabelFormTileDesktop";
import SaveModal from "./SaveModal";
import BackModal from "./BackModal";

import CurrentLabel from "./CurrentLabel";
import dakImage from './img/dak.svg';
import tuinImage from './img/tuin.svg';
import voorzieningImage from './img/voorziening.svg';
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions'
import {getLabelAssetsTotalArea} from './utils/labelFunctions';
import MapBuilding from "./MapBuilding";


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
    
    fetchBuildings,
    createNewLabel,
    changeLabel,
    openSaveModal,
    saveLabel,
    setEditedWaterlabel,
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
    setGuiLabelTabDesktop,
    setEmail,
    setGuiShowEmail,
    closeSaveModal,
    setGuiInfoTab,
    setGuiShowBackModal,
    guiShowBackModal,
    buildingGeoJSON,
    surroundingBuildings
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
      <BackModal
        backToAddressSearchForm={backToAddressSearchForm}
        guiShowBackModal={guiShowBackModal}
        setGuiShowBackModal={setGuiShowBackModal}
      />
      
      <Header
        foundAddressesList={foundAddressesList}
        backToAddressSearchForm={backToAddressSearchForm}
        selectedAddress={selectedAddress}
        setGuiShowBackModal={setGuiShowBackModal}
        editedFinishedWaterlabel={editedFinishedWaterlabel}
        editedWaterlabel={editedWaterlabel}
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
          closeModal={(callBack)=>{
            closeSaveModal(callBack);
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
            selectAddress={(address, callback)=>{
              selectAddress(address, callback);
            }}
          />
        </div>
        <div
          className="Mobile Tile"
        >
          <CurrentLabel
            selectedAddress={selectedAddress}
            latestWaterlabel={latestWaterlabel}
            editedWaterlabel={editedWaterlabel}
            computedWaterlabel={computedWaterlabel}
            editedFinishedWaterlabel={editedFinishedWaterlabel}
            guiShowEmail={guiShowEmail}
            guiShowSuccesSave={guiShowSuccesSave}
            buildingGeoJSON={buildingGeoJSON}
            surroundingBuildings={surroundingBuildings}
          />
        </div>
        <div
          className="Desktop Tile Currentlabel"
          style={
            selectedAddress !== null 
            ? 
            {} 
            : 
            {display: "none"} 
          }
        >
          <CurrentLabel
            selectedAddress={selectedAddress}
            latestWaterlabel={latestWaterlabel}
            editedWaterlabel={editedWaterlabel}
            computedWaterlabel={computedWaterlabel}
            editedFinishedWaterlabel={editedFinishedWaterlabel}
            openSaveModal={openSaveModal}
            guiShowEmail={guiShowEmail}
            guiShowSuccesSave={guiShowSuccesSave}
            buildingGeoJSON={buildingGeoJSON}
          />
        </div>
        <button
          className="Mobile Button StandardButton NewButton"
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
          className={
            !guiShowEmail &&
            !guiShowSuccesSave
            ?
            "Mobile Button StandardButton NewButton NieuwLabelOpslaan Alert"
            :
            "Mobile Button StandardButton NewButton NieuwLabelOpslaan"
          }
          onClick={e=>{
            e.preventDefault();
            openSaveModal(_=>{
              const elmnt = document.getElementsByClassName("ModalSave")[0]
                                    .getElementsByClassName("Email")[0];
              scrollElementIntoViewWorkaround(elmnt);
            });
          }}
          style={
            editedFinishedWaterlabel &&
            !editedWaterlabel ?
            {}
            :
            {display: "none"}
          }
          disabled={editedFinishedWaterlabel && getLabelAssetsTotalArea(editedFinishedWaterlabel.assets) === 0}
        >
          LABEL OPSLAAN
        </button>
        <LabelFormTileDesktop
          assetTypeFetchState={assetTypeFetchState}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          guiLabelTab={guiLabelTab}
          setGuiLabelTab={setGuiLabelTab}
          setGuiLabelTabDesktop={setGuiLabelTabDesktop}
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
          selectedAddress={selectedAddress}
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
            STOWA en Stichting RIONED hebben een nieuwe uniforme scoringsmethodiek voor maatregelen tegen wateroverlast op particulier terrein gemaakt. Het waterlabel wordt bepaald door de hoeveelheid neerslag (in millimeters) die een perceel kan bergen en laten infiltreren bij een piekbui die in één uur valt. Daarbij gaat het om de gemiddelde berging over het gehele perceel. Het maakt dus niet uit of de eigenaar deze berging op het dak, ondergronds of in de tuin heeft gerealiseerd.
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
      </div>
    </div>
  );
}