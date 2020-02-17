import React from 'react';
import LabelFormDesktop from "./LabelFormDesktop";
import './LabelFormTileDesktop.css';

import dakImage from './img/dak.svg';
import tuinImage from './img/tuin.svg';
import voorzieningImage from './img/voorziening.svg';
import tuinHuisGrasImage from './img/tt01.png';


export default function LabelFormTileDesktop (props) {

  const { 
    assetTypeFetchState,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    setGuiLabelTab,
    setGuiLabelTabDesktop,
    changeLabel,
    assetTypesFromServer,
    showLabelFormDetails,
    setShowLabelFormDetails,
    createNewLabel,
    setEditedWaterlabel,
    editingWaterlabelReady,
    computedWaterlabelState,
    computedWaterlabel,
    selectedAddress,
  } = props;

  const guiLabelTabConsideredDefault = guiLabelTab || "Dak";


  return (
    <div
    className={`Desktop Tile`}
    style={
      assetTypeFetchState === "RECEIVED"  && selectedAddress !== null
      ?
      {}
      :
      {display: "none"}
    }
  >
    <div
      className="TabContainerHorizontal"
    >
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTabDesktop("Dak", _ => {
            // no op
          });
                    
        }}
        className={
          guiLabelTabConsideredDefault === "Dak" ? "TabActive Tab" : "Tab TabInActive" 
        }
        disabled={editedWaterlabel !== null && guiLabelTabConsideredDefault !== "Dak"}
      >
        <span>
          <img src={dakImage} alt=""  width="36px"/>
        </span>
        <span>{"Mijn dak"}</span>
        
      </button>
     
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTabDesktop("Tuin", _ => {
            // no op
          });
                    
        }}
        className={
          guiLabelTabConsideredDefault === "Tuin"  ? "TabActive Tab" : "Tab TabInActive" 
        }
        disabled={editedWaterlabel !== null && guiLabelTabConsideredDefault !== "Tuin"}
      >
        <span>
          <img src={tuinImage} alt=""  width="36px"/>
        </span>
        <span>{"Mijn tuin"}</span>
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTabDesktop("Voorziening", _ => {
            // no op
          });
                    
        }}
        className={
          guiLabelTabConsideredDefault === "Voorziening" ? "TabActive Tab" : "Tab TabInActive" 
        }
        disabled={editedWaterlabel !== null && guiLabelTabConsideredDefault !== "Voorziening"}
      >
        <span>
          <img src={voorzieningImage} alt=""  width="36px"/>
        </span>
        <span>{"Mijn maatregel"}</span>
      </button>
    </div>
    
    <div
      className="DesktopLabelformTileBody"
    >
      <div
        className="DesktopLabelformTileBodyLeft"
      >
        <h1>Wat is belangrijk?</h1>
        <p >
        Hoe meer water in de tuin kan worden vast gehouden, hoe beter! Dat betekent dus hoe groener, hoe beter!
        </p>
        <div
          className="ImgContainer"
        >
          <img alt="Schematische afbeelsing groene tuin"  src={tuinHuisGrasImage}/>
        </div>
        
      </div>
      {/* vertical border */}
      <div><div></div></div>
      <div
        className="DesktopLabelformTileBodyRight"
      >
        <h1
          style={guiLabelTabConsideredDefault === "Dak" ? {}:{display: "none"}}
        >
          Kenmerken dak
        </h1>
        <h1
          style={guiLabelTabConsideredDefault === "Tuin" ? {}:{display: "none"}}
        >
          Kenmerken tuin
        </h1>
        <h1
          style={guiLabelTabConsideredDefault === "Voorziening" ? {}:{display: "none"}}
        >
          Kenmerken voorziening
        </h1>


        <LabelFormDesktop
          assetTypesFromServer={assetTypesFromServer}
          latestWaterlabel={latestWaterlabel}
          editedWaterlabel={editedWaterlabel}
          editedFinishedWaterlabel={editedFinishedWaterlabel}
          guiLabelTab={guiLabelTabConsideredDefault}
          showLabelFormDetails={showLabelFormDetails}
          setShowLabelFormDetails={bool=>setShowLabelFormDetails(bool)}
          createNewLabel={createNewLabel}
          changeLabel={changeLabel}
          setGuiLabelTab={tab => setGuiLabelTab(tab)}
          setEditedWaterlabel={setEditedWaterlabel}
          editingWaterlabelReady={editingWaterlabelReady}
          computedWaterlabelState={computedWaterlabelState}
          computedWaterlabel={computedWaterlabel}
          setGuiLabelTabDesktop={setGuiLabelTabDesktop}
        />
      </div>
    </div>
  </div>
  );
}

