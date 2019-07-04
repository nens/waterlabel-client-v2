import React from 'react';

import {copyLabelData, } from "./utils/labelFunctions";
import './LabelFormMobile.css';

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
    showLabelFormDetails,
    setShowLabelFormDetails,
    setEditedWaterlabel,
    editingWaterlabelReady,
  } = props;

  const waterlabelToUse = 
    editedWaterlabel ? editedWaterlabel : 
    (editedFinishedWaterlabel ? editedFinishedWaterlabel : latestWaterlabel);

  const assetsToUse = waterlabelToUse && waterlabelToUse.assets;
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)


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


      <div> 
        <div 
          className="Row AssetRow AssetRowHeader"
        >
          <div
            className="ColumnAssetType"
          >

          </div>
          <div
            className="ColumnAssetArea"
          >
            Opp.
          </div>

        </div>
        <ul>
          {
            assetsToUse && assetsToUse
              .map( (asset, index) => {
                const assetInActiveTab = 
                  asset.category ===  guiLabelTab; 
                return (
                  <li
                    key={index}
                    style={assetInActiveTab? {}:{display:"none"}}
                    className="Row"
                  >
                    {/* _______________________________________________SELECT CATEGORY */}
                    <div
                      className="ColumnAssetType"
                    >
                    { asset.type === null 
                      ?
                      <select
                        onChange={ event => {
                          event.preventDefault();
                          console.log(JSON.stringify(event.target.value));

                          const selectedAsset = assetTypesFromServer.filter(type=>type.code === event.target.value)[0];
                          const copyLabel = copyLabelData(waterlabelToUse);
                          copyLabel.assets[index].type = selectedAsset;
                          copyLabel.assets[index].asset_type = selectedAsset.code;
                          copyLabel.assets[index].category = guiLabelTab
                          // only set storage and infiltration if not touched by the user
                          if (copyLabel.assets[index].storage == 0) {
                            copyLabel.assets[index].storage = selectedAsset.storage
                          }
                          if (copyLabel.assets[index].infiltration == 0) {
                            copyLabel.assets[index].infiltration = selectedAsset.infiltration
                          }
                          setEditedWaterlabel(copyLabel);
                        }}
                      >
                        {filteredAssetTypes.map(assetType=>
                          <option key={assetType.name} value={assetType.code}>{assetType.name}</option>
                        )}
                        <option style={{display:"none"}} disabled selected value> Kies een type </option>
                      </select>
                      :
                      <div>{asset.type && asset.type.name}</div>
                    }
                    </div>

                    {/* ___________________________________________ AREA OPPERVLAK */}
                    <div
                      className="ColumnAssetArea"
                    >
                      {
                        editedWaterlabel ?
                        <div>
                          {/* <label>area: </label>  */}
                          <input
                            value={asset.area}
                            onChange={ event => {
                              const copyLabel = copyLabelData(waterlabelToUse);
                              copyLabel.assets[index].area = event.target.value;                          
                              setEditedWaterlabel(copyLabel);
                            }}
                          >
                          </input>
                        </div>
                        :
                        <div>{asset.area}</div>
                      }
                    </div>
                    <div>

                    {/* __________________________________________ REMOVE ASSET */}
                    <div
                      className="ButtonRemoveAsset"
                    >
                      <button
                        title="Verwijder dit item"
                        style={editedWaterlabel?{}:{display:"none"}}
                        onClick={e=>{
                          e.preventDefault();
                          const copyLabel = copyLabelData(waterlabelToUse);
                          copyLabel.assets.splice(index, 1); // remove index from array                    
                          setEditedWaterlabel(copyLabel);
                        }}
                      >
                        x
                      </button>
                    </div>
                    </div>
                  </li>
                );
          })}
          <li
            style={editedWaterlabel? {}:{display:"none"}}
            className="Row"
          >
            {/* ___________________________________________  NEW BUTTON */}
            <div
              className="ColumnAssetType"
            >
              <button
                className="StandardButton NewAssetButton"
                onClick={e=>{
                  e.preventDefault();
                  const copyLabel = copyLabelData(waterlabelToUse);
                  copyLabel.assets.push({
                    area: 0,
                    storage: 0,
                    infiltration: 0,
                    sewer_connection: true,
                    category: guiLabelTab,
                    type: null,
                    asset_type: null,
                  })                
                  setEditedWaterlabel(copyLabel);
                }}
              >
                + Nieuwe invoer
              </button>
            </div>
          </li>
        </ul>
        
      </div>
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
        <button
          className="StandardButton Klaar"
          onClick={e => {
            e.preventDefault();
            editingWaterlabelReady();
            
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
      </div>
        
    </div>
  );
}

