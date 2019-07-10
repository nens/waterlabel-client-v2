import React from 'react';
import LabelFormDesktop from "./LabelFormDesktop";
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions';
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
    tabImage,
    tabText,
    TabName,
    tileClassName,
    assetTypesFromServer,
    showLabelFormDetails,
    setShowLabelFormDetails,
    createNewLabel,
    setEditedWaterlabel,
    editingWaterlabelReady,
    computedWaterlabelState,
    computedWaterlabel,
  } = props;


  return (
    <div
    className={`Desktop Tile`}
    style={
      assetTypeFetchState === "RECEIVED"  
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
          guiLabelTab === "Dak" ? "TabActive Tab" : "Tab TabInActive" 
        }
      >
        <span>
          <img src={dakImage} width="36px"/>
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
          guiLabelTab === "Tuin" || guiLabelTab === null  ? "TabActive Tab" : "Tab TabInActive" 
        }
      >
        <span>
          <img src={tuinImage} width="36px"/>
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
          guiLabelTab === "Voorziening" ? "TabActive Tab" : "Tab TabInActive" 
        }
      >
        <span>
          <img src={voorzieningImage} width="36px"/>
        </span>
        <span>{"Mijn voorziening"}</span>
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
          <img src={tuinHuisGrasImage}/>
        </div>
        
      </div>
      {/* vertical border */}
      <div><div></div></div>
      <LabelFormDesktop
        assetTypesFromServer={assetTypesFromServer}
        latestWaterlabel={latestWaterlabel}
        editedWaterlabel={editedWaterlabel}
        editedFinishedWaterlabel={editedFinishedWaterlabel}
        guiLabelTab={guiLabelTab || 'Tuin'}
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
  </div>
  );
}

