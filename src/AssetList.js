import React from 'react';

import {copyLabelData, } from "./utils/labelFunctions";

const getElementByClassWithinSameUnorderedListAsSourceElement = (sourceElement, className) => {
  const parent = sourceElement.closest("ul");
  console.log('parent', parent, sourceElement)
  if (parent) {
    const element = parent.getElementsByClassName(className);
    console.log('element', element)
    if (element && element[0]) {
      return element[0];
    }
  }
  return null;
}

export default function AssetList (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    changeLabel,
    setEditedWaterlabel,
    setGuiLabelTabDesktop,
  } = props;

  const waterlabelToUse = 
    editedWaterlabel ? editedWaterlabel : 
    (editedFinishedWaterlabel ? editedFinishedWaterlabel : latestWaterlabel);

  const assetsToUse = waterlabelToUse && waterlabelToUse.assets;
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)
  const htmlSuffixSelect = '_index_asset_select';
  const htmlSuffixArea = '_index_area_select';
  const htmlSuffixStorage = '_index_storage_select';


  return (
        <ul>
          {
            assetsToUse && assetsToUse
              .map( (asset, index) => {
                // const assetInActiveTab = 
                //   asset.category ===  guiLabelTab;

                const htmlSelectClass = index + htmlSuffixSelect;
                const htmlAreaClass = index + htmlSuffixArea;
                const htmlStorageClass = index + htmlSuffixStorage;
                
                
                return (
                  <li
                    key={index}
                    // style={assetInActiveTab? {}:{display:"none"}}
                    className="Row"
                  >
                    {/* _______________________________________________SELECT CATEGORY */}
                    <div
                      className="ColumnAssetType"
                    >
                    
                      <select
                        style={asset.type === null ? {} : {display: "none"}}
                        className={htmlSelectClass}
                        onChange={ event => {
                          event.preventDefault();
                          console.log(JSON.stringify(event.target.value));
                          const target = event.target;

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
                          setEditedWaterlabel(copyLabel, _ => {
                            setTimeout(_=> {
                              let inputElement
                              if (guiLabelTab === "Voorziening") {
                                inputElement = getElementByClassWithinSameUnorderedListAsSourceElement(target, htmlStorageClass);
                              } else {
                                inputElement = getElementByClassWithinSameUnorderedListAsSourceElement(target, htmlAreaClass);
                              }
                              if (inputElement) {
                                inputElement.focus(); // unfortuenedly this does not open the select, seems impossible ...
                              }
                            })
                          })
                          }}
                        >
                          {filteredAssetTypes.map(assetType=>
                            <option key={assetType.name} value={assetType.code}>{assetType.name}</option>
                          )}
                          <option style={{display:"none"}} disabled selected value> Kies een type </option>
                        </select>
                      <div
                        style={asset.type === null ? {display: "none"} : {}}
                      >
                        {asset.type && asset.type.name}
                      </div>
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
                              className={htmlAreaClass}
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
                          className={htmlStorageClass}
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
                  const target = e.target;
                  e.preventDefault();
                  const copyLabel = copyLabelData(waterlabelToUse);
                  copyLabel.assets.push({
                    area: guiLabelTab === 'Dak' || guiLabelTab === 'Tuin' ? 10 : 0,
                    storage: 0,
                    infiltration: 0,
                    sewer_connection: true,
                    category: guiLabelTab,
                    type: null,
                    asset_type: null,
                  })                
                  setEditedWaterlabel(copyLabel, _ => {
                    const index = waterlabelToUse.assets.length;
                    
                    const htmlId = index + '_index_asset_edited_waterlabel';
                    setTimeout(_=> {
                      const index = waterlabelToUse.assets.length;
                      const selectBox = getElementByClassWithinSameUnorderedListAsSourceElement(target, index + htmlSuffixSelect);
                      if (selectBox) {
                        selectBox.focus(); // unfortuenedly this does not open the select, seems impossible ...
                      }
                    },
                    0
                    )

                    // document.getElementById(htmlId) //.getElementsByTagName('select').focus();
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
                // setGuiLabelTabDesktop is only defined for desktoptab
                setGuiLabelTabDesktop && setGuiLabelTabDesktop(guiLabelTab);
              }}
              
            >
              VOER STATISTIEKEN IN
            </button>
          </li>
        </ul>
  );
}
