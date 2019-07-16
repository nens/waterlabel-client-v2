import React from 'react';

import './LabelFormDesktop.css';
import AssetList from "./AssetList";
import checkboxUnchecked from './img/checkbox_unchecked.png';
import checkboxChecked from './img/checkbox_checked.png';

export default function LabelFormDesktop (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    changeLabel,
    setEditedWaterlabel,
    editingWaterlabelReady,
    setGuiLabelTabDesktop,
    showLabelFormDetails,
    setShowLabelFormDetails,
  } = props;

  return (
    <div
    className="LabelFormMobile"
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    }}
    >

      <AssetList
        assetTypesFromServer={assetTypesFromServer}
        latestWaterlabel={latestWaterlabel}
        editedWaterlabel={editedWaterlabel}
        editedFinishedWaterlabel={editedFinishedWaterlabel}
        guiLabelTab={guiLabelTab}
        changeLabel={changeLabel}
        setEditedWaterlabel={setEditedWaterlabel}
        setGuiLabelTabDesktop={setGuiLabelTabDesktop}
        showLabelFormDetails={showLabelFormDetails}
      />
      <div
        className="RowForButtons"
        style={
          editedWaterlabel !== null
          ?
          {}
          :
          {display: "none"}
        }
      >
        {/* _____________________________________________ Annuleer FINISHED BUTTON */}
        <button
          className="StandardButton Annuleer"
          onClick={e => {
            e.preventDefault();
            setEditedWaterlabel(null);
          }}
        >
          ANNULEER
        </button>
        
        <button
          className={
            showLabelFormDetails
            ?
            "ShowMoreButton Checked"
            :
            "ShowMoreButton UnChecked"
          }
          onClick={_=>{
            if (showLabelFormDetails===false) {
              setShowLabelFormDetails(true);
            } else {
              setShowLabelFormDetails(false);
            }
          }}
        >
          {showLabelFormDetails
          ?
          <img
            height="20px"
            width="20px"
            src={checkboxChecked}
            alt=""
          ></img>
          :
           <img
            height="20px"
            width="20px"
            src={checkboxUnchecked}
            alt=""
          ></img>
          }
          
          <span>Extra Details</span>
        </button>
        
      
        {/* _____________________________________________ KLAAR FINISHED BUTTON */}
        <div
          className="KlaarButtonContainer"
        >
          <button
            className="StandardButton Klaar"
            disabled={editedWaterlabel && editedWaterlabel.assets.map(asset => asset.asset_type).includes(null)}
            onClick={e => {
              e.preventDefault();
              editingWaterlabelReady(guiLabelTab);
              
            }}
          >
            KLAAR
          </button>
          <span>Kies eerst het type in het dropdown menu</span>
        </div>
      </div>
        
    </div>
  );
}

