import React from 'react';

import {copyLabelData, } from "./utils/labelFunctions";

export default function AssetList (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    changeLabel,
    setEditedWaterlabel,
  } = props;

  const waterlabelToUse = 
    editedWaterlabel ? editedWaterlabel : 
    (editedFinishedWaterlabel ? editedFinishedWaterlabel : latestWaterlabel);

  const assetsToUse = waterlabelToUse && waterlabelToUse.assets;
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)


  return (
        <ul>
          {
            assetsToUse && assetsToUse
              .map( (asset, index) => {
                // const assetInActiveTab = 
                //   asset.category ===  guiLabelTab;
                const htmlId = index + '_index_asset_edited_waterlabel';
                
                return (
                  <li
                    key={index}
                    // style={assetInActiveTab? {}:{display:"none"}}
                    className="Row"
                    id={htmlId}
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
                    
                    {
                      guiLabelTab !== "Voorziening" 
                      ? 
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
                                let value =event.target.value;
                                if (parseInt(value)) { // also ignore 0
                                  copyLabel.assets[index].area = parseInt(value); 
                                } else if (value==='') {
                                  copyLabel.assets[index].area = ''; 
                                }
                                setEditedWaterlabel(copyLabel);
                              }}
                            >
                            </input>
                          </div>
                          :
                          <div>{asset.area}</div>
                        }
                      </div>
                    :
                    <div
                      className="ColumnAssetArea"
                    >
                    {
                      editedWaterlabel ?
                      <div>
                        <input
                          value={asset.storage}
                          onChange={ event => {
                            const copyLabel = copyLabelData(waterlabelToUse);
                            copyLabel.assets[index].storage = event.target.value;                          
                            setEditedWaterlabel(copyLabel);
                          }}
                        >
                        </input>
                      </div>
                      :
                      <div>{asset.storage}</div>
                    }
                    </div>
                  }
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
              })
              // .filter(asset => {
              //   const assetInActiveTab = 
              //         asset.category ===  guiLabelTab || asset.category === null; 
              //       return assetInActiveTab;
              // })
          }
          <li
            style={!editedWaterlabel || editedWaterlabel.assets.map(asset => asset.asset_type).includes(null)? {visibility:"hidden"}:{}}
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
                  setEditedWaterlabel(copyLabel, _ => {
                    const index = waterlabelToUse.assets.length - 1;
                    const htmlId = index + '_index_asset_edited_waterlabel';
                    document.getElementById(htmlId).getElementsByTagName('select').focus();
                  });
                }}
              >
                + Nieuwe invoer
              </button>
            </div>
          </li>
          <li
            style={
              editedWaterlabel === null && latestWaterlabel===null && editedFinishedWaterlabel===null ?
              {}
              :
              {display: "none"}
            }
          >
            <button
              className="StandardButton Voerin"
              onClick={e => {
                e.preventDefault();
                changeLabel();
                
              }}
              
            >
              VOER STATISTIEKEN IN
            </button>
          </li>
        </ul>
  );
}

