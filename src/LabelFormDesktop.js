import React from 'react';

import './LabelFormDesktop.css';
import AssetList from "./AssetList";

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
            // setGuiLabelTab(null);
            
          }}
          style={
            editedWaterlabel !== null ?
            {}
            :
            // {display: "none"}
            {visibility: "hidden"}
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
              editingWaterlabelReady(guiLabelTab);
              
            }}
            style={
              editedWaterlabel !== null
              ?
              {}
              :
              {display: "none"}
            }
          >
            KLAAR
          </button>
          <span>Kies eerst het type in het dropdown menu</span>
        </div>
        {/* <button
          className="StandardButton Verander"
          onClick={e => {
            e.preventDefault();
            changeLabel();
            setGuiLabelTabDesktop(guiLabelTab || "Tuin", _ => {
              // no op
            });
            
          }}
          style={
            editedWaterlabel === null && (latestWaterlabel!==null || editedFinishedWaterlabel!==null) ?
            {}
            :
            {display: "none"}
          }
          
        >
          Verander
        </button> */}
      </div>
        
    </div>
  );
}

