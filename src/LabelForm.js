import React from 'react';

import LabelTabButtons from "./LabelTabButtons";
import {copyLabelData, } from "./utils/labelFunctions";

export default LabelForm;

function LabelForm (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    changeLabel,
    showLabelFormDetails,
    setShowLabelFormDetails,
    setGuiLabelTab,
    setEditedWaterlabel,
    editingWaterlabelReady,
  } = props;

  const waterlabelToUse = 
    editedFinishedWaterlabel ? editedFinishedWaterlabel : 
    (editedWaterlabel ? editedWaterlabel : latestWaterlabel);

  const assetsToUse = waterlabelToUse && waterlabelToUse.assets;
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)


  return (
    <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    }}
    >
      <LabelTabButtons
        guiLabelTab={guiLabelTab}
        setGuiLabelTab={setGuiLabelTab}
      />
      <div>
        
        <div>
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
                    >
                      {/* _______________________________________________SELECT CATEGORY */}
                      <div>____________________________________</div>
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
                          <option style={{display:"none"}} disabled selected value> -- select an option -- </option>
                        </select>
                        :
                        <div>asset_type: {asset.asset_type}</div>
                      }

                      {/* ___________________________________________ AREA OPPERVLAK */}
                      <div>
                        {
                          editedWaterlabel ?
                          <div>
                            <label>area: </label> 
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

                        {/* __________________________________________BERGING STORAGE */}
                        <div
                          style={showLabelFormDetails ? {} : {display:"none"}}
                        >
                        {
                          editedWaterlabel ?
                          <div>
                            <label>storage: </label> 
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
                      </div>
                      {/* __________________________________________________INFILTRATION */}
                      {/* <div
                        style={showLabelFormDetails ? {} : {display:"none"}}
                      >
                      {
                        editedWaterlabel ?
                        <div>
                          <label>infiltration: </label> 
                          <input
                            value={asset.infiltration}
                            onChange={ event => {
                              const copyLabel = copyLabelData(waterlabelToUse);
                              copyLabel.assets[index].infiltration = event.target.value;                          
                              setEditedWaterlabel(copyLabel);
                            }}
                          >
                          </input> 
                        </div>
                        :
                        <div>{asset.infiltration}</div>
                      }
                      </div> */}
                      {/* ______________________________________________________SEWEGE CONNECTION */}
                      {/* <div
                        style={showLabelFormDetails ? {} : {display:"none"}}
                      >
                      {
                          editedWaterlabel ?
                          <div>
                            <input
                              type="checkbox"
                              checked={asset.sewer_connection}
                              onChange={ event => {
                                // const newAsset = {
                                //   ...copyLabel.assets[index],
                                //   sewer_connection: event.target.checked
                                // };
                                // const newAssets = [...copyLabel.assets];
                                // newAssets[index] = newAsset;
                                // const newcopyLabel = {
                                //   ...copyLabel,
                                //   assets: newAssets
                                // };
                                const copyLabel = copyLabelData(waterlabelToUse);
                                copyLabel.assets[index].sewer_connection = event.target.checked;                          
                                setEditedWaterlabel(copyLabel);
                              }}
                            >
                            </input>
                          </div>
                          :
                          <div>{asset.sewer_connection + ''}</div>
                        }
                        </div> */}
                        {/* __________________________________________ REMOVE ASSET */}
                      <div>
                        <button
                          style={editedWaterlabel?{}:{display:"none"}}
                          onClick={e=>{
                            e.preventDefault();
                            const copyLabel = copyLabelData(waterlabelToUse);
                            copyLabel.assets.splice(index, 1); // remove index from array                    
                            setEditedWaterlabel(copyLabel);
                          }}
                        >
                          X
                        </button>
                      </div>
                    </li>
                  );
            })}
            <li
              style={editedWaterlabel? {}:{display:"none"}}
            >
              <div>____________________________________</div>
              {/* ___________________________________________  NEW BUTTON */}
              <button
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
                NEW
              </button>
            </li>
          </ul>
          
        </div>
        <div>
          {/* _________________________________________________ VERANDER BUTTON */}
          <button
            onClick={e => {
              e.preventDefault();
              changeLabel();
              
            }}
            style={
              latestWaterlabel !== null &&
              editedWaterlabel === null ?
              {}
              :
              {display: "none"}
            }
          >
            Verander
          </button>
          {/* _____________________________________________ KLAAR FINISHED BUTTON */}
          <button
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
            Klaar
          </button>
          {/* _____________________________________________________________________ SHOW DETAILS CHECKBOX */}
          <div>
            <input
              type="checkbox"
              checked={showLabelFormDetails}
              onChange={ event => {
                setShowLabelFormDetails(event.target.checked);                          
              }}
            >
            </input>
          </div>
        </div>

      </div>
      
    </div>
  );
}

