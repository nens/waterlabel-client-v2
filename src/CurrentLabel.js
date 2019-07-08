import React from 'react';
import labelsImage from './img/labels.png';

export default CurrentLabel;
function CurrentLabel (props) {

  const {
    selectedAddress,
    latestWaterlabel,
    editedWaterlabel,
    computedWaterlabel,
    editedFinishedWaterlabel,
  } = props;

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
          className="Text NoLabelYetLayOver"
          style={
            (
            selectedAddress !== null &&
            latestWaterlabel === null &&
            editedWaterlabel === null &&
            computedWaterlabel == null &&
            (editedFinishedWaterlabel === null || (editedFinishedWaterlabel && editedFinishedWaterlabel.code===null))
            )
            ||
              (
                editedWaterlabel && 
                (
                  computedWaterlabel === null ||
                  ( computedWaterlabel && computedWaterlabel.detail === "The assets sum up to zero area")
                )
              )
            ?
            {}
            :
            {display: "none"}
          }
        >
          <legend>U heeft nog geen label</legend>
        </div>
        <div 
          className="BackgroundImage"
        >   
            {/*_______________________________________ COMPUTED WATERLABEL */}
            {/*_______________________________________ LATEST WATERLABEL */}
            <div
              className="Margin"
            >
              <div
                className="Text"
                style={
                  (editedFinishedWaterlabel && editedFinishedWaterlabel.code) ||
                  computedWaterlabel ||
                  latestWaterlabel ?
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
        
      </div>
  );
}