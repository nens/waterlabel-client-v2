import React from 'react';
import './AssetList.css';

import {copyLabelData, } from "./utils/labelFunctions";

const getElementByClassWithinSameUnorderedListAsSourceElement = (sourceElement, className) => {
  const parent = sourceElement.closest("ul");
  if (parent) {
    const element = parent.getElementsByClassName(className);
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

  const assetsToUse = (waterlabelToUse && waterlabelToUse.assets) || [];
  const filteredAssetTypes = assetTypesFromServer.filter(type=>type.category === guiLabelTab)
  const htmlSuffixSelect = '_index_asset_select';
  const htmlSuffixArea = '_index_area_select';
  const htmlSuffixStorage = '_index_storage_select';


  return (
      <div style={{maxWidth: "600px"}}> 
        <div 
          className="Row AssetRow AssetRowHeader"
          style={
            assetsToUse.filter(asset =>  asset.category ===  guiLabelTab).length !== 0
            ?
            {}
            :
            {display: "none"}
          }
        >
          <div
            className="ColumnAssetType"
          >

          </div>
          <div
            className="ColumnAssetArea"
          >
            {guiLabelTab === "Voorziening" ? "Berging" : "Opp."}
          </div>

        </div>
        <ul
          className="AssetList"
        >
          {
            assetsToUse && assetsToUse
              .map( (asset, index) => {
                // const assetInActiveTab = 
                //   asset.category ===  guiLabelTab;

                const htmlSelectClass = index + htmlSuffixSelect;
                const htmlAreaClass = index + htmlSuffixArea;
                const htmlStorageClass = index + htmlSuffixStorage;
                
                
                return (
                  {asset:asset,
                  html: <li
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
                          const target = event.target;

                          const selectedAsset = assetTypesFromServer.filter(type=>type.code === event.target.value)[0];
                          const copyLabel = copyLabelData(waterlabelToUse);
                          copyLabel.assets[index].type = selectedAsset;
                          copyLabel.assets[index].asset_type = selectedAsset.code;
                          copyLabel.assets[index].category = guiLabelTab
                          // only set storage and infiltration if not touched by the user
                          if (copyLabel.assets[index].storage === 0) {
                            copyLabel.assets[index].storage = selectedAsset.storage
                          }
                          if (copyLabel.assets[index].infiltration === 0) {
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
                          <div
                          className="AssetInputContainer"
                          >
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
                            <div>
                              <span>m2</span>
                            </div>
                          </div>
                          :
                          <div>{asset.area + ' m2'}</div>
                        }
                      </div>
                    :
                    <div
                      className="ColumnAssetArea ColumnAssetStorage"
                      title="Opslag in Liters"
                    >
                    {
                      editedWaterlabel ?
                      <div
                        className="AssetInputContainer"
                      >
                        <input
                          className={htmlStorageClass}
                          value={asset.storage}
                          onChange={ event => {
                            const copyLabel = copyLabelData(waterlabelToUse);
                            let value = event.target.value;
                            if (parseInt(value)) { // also ignore 0
                              copyLabel.assets[index].storage = parseInt(value); 
                            } else if (value==='') {
                              copyLabel.assets[index].storage = ''; 
                            }                         
                            setEditedWaterlabel(copyLabel);

                          }}
                        >
                        </input>
                        <div><span>L.</span></div>
                      </div>
                      :
                      <div>{asset.storage + ' L.'}</div>
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
                ,});
              })
              .filter(assetObj => {
                const assetInActiveTab = 
                  assetObj.asset.category ===  guiLabelTab || assetObj.asset.category === null; 
                    return assetInActiveTab;
              }).map(assetObj=>assetObj.html)
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
                    setTimeout(_=> {
                      const index = waterlabelToUse.assets.length;
                      const selectBox = getElementByClassWithinSameUnorderedListAsSourceElement(target, index + htmlSuffixSelect);
                      if (selectBox) {
                        selectBox.focus(); // unfortuenedly this does not open the select, seems impossible ...
                      }
                    },
                    0
                    )

                  });
                }}
              >
                + Nieuwe invoer
              </button>
            </div>
          </li>
          <li
            style={
              editedWaterlabel === null && assetsToUse.filter(asset =>  asset.category ===  guiLabelTab).length === 0
              ?
              {}
              :
              {display: "none"}
            }
          >
            <div>
              Er zijn op dit adres nog geen statistieken bekend.
            </div>
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
          <li
            style={
              editedWaterlabel === null && assetsToUse.filter(asset =>  asset.category ===  guiLabelTab).length !== 0
              ?
              {}
              :
              {display: "none"}
            }
            className="Row VeranderButtonRow"
          >
            <legend
              className="Verander"
            >   
              Kloppen deze cijfers niet (meer)?
            </legend>
            <button
              className="StandardButton Verander"
              onClick={e => {
                e.preventDefault();
                changeLabel();
                setGuiLabelTabDesktop(guiLabelTab || "Tuin", _ => {
                  // no op
                });
                
              }}
              
              
            >
              Verander
            </button>
          </li>
        </ul>
      </div>
  );
}

