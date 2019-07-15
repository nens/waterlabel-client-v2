import React from 'react';

import './LabelFormMobile.css';
import AssetList from "./AssetList";


export default LabelFormMobile;

function LabelFormMobile (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    setGuiLabelTab,
    guiLabelTab,
    changeLabel,
    setEditedWaterlabel,
    editingWaterlabelReady,
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
      <p >
      Hoe meer water in de tuin kan worden vast gehouden, hoe beter! Dat betekent dus hoe groener, hoe beter! Voer hieronder de statistieken van uw tuin in, daarmee berekenen wij een label!
      </p>
      <AssetList
        assetTypesFromServer={assetTypesFromServer}
        latestWaterlabel={latestWaterlabel}
        editedWaterlabel={editedWaterlabel}
        editedFinishedWaterlabel={editedFinishedWaterlabel}
        guiLabelTab={guiLabelTab}
        changeLabel={changeLabel}
        setEditedWaterlabel={setEditedWaterlabel}
      />
      <div
        className="RowForButtons"
      >
        {/* _____________________________________________ Annuleer FINISHED BUTTON */}
        <button
          className="StandardButton Annuleer"
          onClick={e => {
            e.preventDefault();
            setEditedWaterlabel(null);
            setGuiLabelTab(null);
            
          }}
          style={
            editedWaterlabel !== null ?
            {}
            :
            {display: "none"}
          }
        >
          ANNULEER
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
              editingWaterlabelReady(null);
              
            }}
            style={
              editedWaterlabel !== null ?
              {}
              :
              {display: "none"}
            }
          >
            KLAAR
          </button>
          <span>Kies eerst het type in het dropdown menu</span>
        </div>
      </div>
        
    </div>
  );
}

