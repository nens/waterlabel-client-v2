import React from 'react';
import labelsImage from './img/labels.png';
import {getLabelAssetsTotalArea} from './utils/labelFunctions';

export default CurrentLabel;
function CurrentLabel (props) {

  const {
    selectedAddress,
    latestWaterlabel,
    editedWaterlabel,
    computedWaterlabel,
    editedFinishedWaterlabel,
    openSaveModal,
  } = props;

  let waterlabelCodeToUse = 
    editedWaterlabel && computedWaterlabel && computedWaterlabel.code ? computedWaterlabel.code :
    editedFinishedWaterlabel ? editedFinishedWaterlabel.code :
    latestWaterlabel ? latestWaterlabel.code :
    null


  return (
    <div
        className="AnyLabelVisual"
        style={
          selectedAddress !== null 
          ? 
          {} 
          : 
          {display: "none"} 
        }
      >
        
        <div 
          className="BackgroundImage"
        >   
            {/*_______________________________________ COMPUTED WATERLABEL */}
            {/*_______________________________________ LATEST WATERLABEL */}
            <div 
              className="Text NoLabelYetLayOver"
              style={
                // (
                // selectedAddress !== null &&
                // latestWaterlabel === null &&
                // editedWaterlabel === null &&
                // computedWaterlabel == null &&
                // (editedFinishedWaterlabel === null || (editedFinishedWaterlabel && editedFinishedWaterlabel.code===null))
                // )
                // ||
                //   (
                //     editedWaterlabel && 
                //     (
                //       computedWaterlabel === null ||
                //       ( computedWaterlabel && computedWaterlabel.detail === "The assets sum up to zero area")
                //     )
                //   )
                !waterlabelCodeToUse
                ?
                {}
                :
                {display: "none"}
              }
            >
              <legend>U heeft nog geen label</legend>
            </div>
            <div
              className="Margin"
            >
              <div
                className="Text"
                style={
                  // (editedFinishedWaterlabel && editedFinishedWaterlabel.code) ||
                  // computedWaterlabel ||
                  // latestWaterlabel 
                  waterlabelCodeToUse
                  ?
                  {}
                  :
                  {visibility: "hidden"}
                }
              >
                {
                editedWaterlabel && computedWaterlabel ? 
                <legend>{"Voorlopig label " + (computedWaterlabel && computedWaterlabel.code)}</legend>
                : editedFinishedWaterlabel ?
                <legend>{"Voorlopig label " + (editedFinishedWaterlabel && editedFinishedWaterlabel.code)}</legend>
                :
                <legend>{"U heeft label " + (latestWaterlabel && latestWaterlabel.code)}</legend>
                }
              </div>
              
              <img src={labelsImage}/>
              
            </div>
        </div>
        <div
          style={
            !editedWaterlabel && editedFinishedWaterlabel?
            {}
            :
            {visibility:"hidden"}
          }
        >
          <button
              className="Desktop StandardButton NieuwLabelOpslaan"
              
              onClick={e=>{
                e.preventDefault();
                openSaveModal(_=>{
                  // no op
                });
              }}
              disabled={editedFinishedWaterlabel && getLabelAssetsTotalArea(editedFinishedWaterlabel.assets) === 0}
          >
            NIEUW LABEL OPSLAAN
          </button>
          <span>
            Kies tenminste één Dak of Tuin invoer.
          </span>
        </div>
      </div>
  );
}