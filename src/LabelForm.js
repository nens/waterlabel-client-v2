import React from 'react';

import LabelTabButtons from "./LabelTabButtons";

export default LabelForm;

function copyLabelData (labelToCopy) {
  return JSON.parse(JSON.stringify(labelToCopy))
}

function LabelForm (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    changeLabel,
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
    <div>
      <LabelTabButtons
        guiLabelTab={guiLabelTab}
        setGuiLabelTab={setGuiLabelTab}
      />
      <div>
      {/* <h4>guiLabelTab: {guiLabelTab}</h4> */}
        
        <div>
          <ul>
            {
              // latestWaterlabel && latestWaterlabel.assets
              assetsToUse && assetsToUse
                .map( (asset, index) => {
                  // const filteredAssetTypeNames = filteredAssetTypes.map(type=>type.code);
                  const currentAssetType = filteredAssetTypes.filter(type=>type.code === asset.asset_type)[0];
                  
                  const assetInActiveTab = 
                    currentAssetType || 
                    asset.asset_type === null ; // also show new assets that user has not given type yet
                  

                  return (
                    <li
                      key={index}
                      style={assetInActiveTab? {}:{display:"none"}}
                    >
                      {/* <hr/> */}
                      <div>____________________________________</div>
                      { asset.asset_type === null 
                        ?
                        <select
                          onChange={ event => {
                            event.preventDefault();
                            console.log(JSON.stringify(event.target.value));

                            const selectedAsset = assetTypesFromServer.filter(type=>type.code === event.target.value)[0];
                            const copyLabel = copyLabelData(waterlabelToUse);
                            copyLabel.assets[index].asset_type = selectedAsset.code;
                            copyLabel.assets[index].storage = selectedAsset.storage;  
                            copyLabel.assets[index].infiltration = selectedAsset.infiltration;
                            copyLabel.assets[index].sewer_connection = true;
                            copyLabel.assets[index].area = 0;
                            setEditedWaterlabel(copyLabel);
                          }}
                        >
                          {filteredAssetTypes.map(assetType=>
                            <option key={assetType.name} value={assetType.code}>{assetType.name}</option>
                          )}
                        </select>
                        :
                        <div>asset_type: {asset.asset_type}</div>
                      }
                    

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
                      <div> 
                        {/* 
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
                        */}
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
                      </div>
                      <div>
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
                      </div>
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
              <button
                onClick={e=>{
                  e.preventDefault();
                  const copyLabel = JSON.parse(JSON.stringify(editedWaterlabel));
                  copyLabel.assets.push({asset_type: null})
                  setEditedWaterlabel(copyLabel);
                }}
              >
                NEW
              </button>
            </li>
          </ul>
          
        </div>
        <div>
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
        </div>

      </div>
      
    </div>
  );
}

