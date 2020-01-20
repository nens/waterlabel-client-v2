import React from 'react';
// import labelsImage from './img/labels.png'; // no longer used
import {getLabelAssetsTotalArea} from './utils/labelFunctions';
import MapBuilding from "./MapBuilding";

export default CurrentLabel;
function CurrentLabel (props) {

  const {
    selectedAddress,
    latestWaterlabel,
    editedWaterlabel,
    computedWaterlabel,
    editedFinishedWaterlabel,
    openSaveModal,
    guiShowEmail,
    guiShowSuccesSave,
    buildingGeoJSON,
  } = props;
  if (buildingGeoJSON) {
    console.log(buildingGeoJSON);
  }

  let waterlabelCodeToUse = 
    editedWaterlabel && computedWaterlabel && computedWaterlabel.code ? computedWaterlabel.code :
    editedFinishedWaterlabel ? editedFinishedWaterlabel.code :
    latestWaterlabel ? latestWaterlabel.code :
    null

  let waterLabelArrowYCoordinate;
  if (!waterlabelCodeToUse) waterLabelArrowYCoordinate = -99999; // do not show
  if (waterlabelCodeToUse === 'A++') waterLabelArrowYCoordinate = -77;
  if (waterlabelCodeToUse === 'A+') waterLabelArrowYCoordinate = -17;
  if (waterlabelCodeToUse === 'A') waterLabelArrowYCoordinate = 43;
  if (waterlabelCodeToUse === 'B') waterLabelArrowYCoordinate = 103;
  if (waterlabelCodeToUse === 'C') waterLabelArrowYCoordinate = 163;
  if (waterlabelCodeToUse === 'D') waterLabelArrowYCoordinate = 222.935;
  if (waterlabelCodeToUse === 'E') waterLabelArrowYCoordinate = 283;
  if (waterlabelCodeToUse === 'F') waterLabelArrowYCoordinate = 343;
  if (waterlabelCodeToUse === 'G') waterLabelArrowYCoordinate = 403;

  const colorLabelG = "#ce342a";
  const colorLabelF = "#cf651d";
  const colorLabelE = "#eb9d21";
  const colorLabelD = "#faec0d";
  const colorLabelC = "#9dba3a";
  const colorLabelB = "#4aa847";
  const colorLabelA = "#1b8e43";
  const colorLabelA1 = "#007629";
  const colorLabelA2 = "#005c20";

  let waterLabelColor = "#ce342a"; // Worst water label is used for G and for no waterlabel yet
  if (waterlabelCodeToUse === "F") {waterLabelColor = colorLabelF};
  if (waterlabelCodeToUse === "E") {waterLabelColor = colorLabelE};
  if (waterlabelCodeToUse === "D") {waterLabelColor = colorLabelD};
  if (waterlabelCodeToUse === "C") {waterLabelColor = colorLabelC};
  if (waterlabelCodeToUse === "B") {waterLabelColor = colorLabelB};
  if (waterlabelCodeToUse === "A") {waterLabelColor = colorLabelA};
  if (waterlabelCodeToUse === "A+") {waterLabelColor = colorLabelA1};
  if (waterlabelCodeToUse === "A++") {waterLabelColor = colorLabelA2};


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
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.33 528">
                <g id="Group_26" data-name="Group 26" transform="translate(-10072 -414)">
                  <path id="Union_1" data-name="Union 1" d="M70,0l32,24L70,48ZM0,48V0H70V48Z" transform="translate(10072 894)" fill={colorLabelG} />
                  <path id="Union_2" data-name="Union 2" d="M95,0l32,24L95,48ZM0,48V0H95V48Z" transform="translate(10072 834)" fill={colorLabelF} />
                  <path id="Union_3" data-name="Union 3" d="M120,0l32,24L120,48ZM0,48V0H120V48Z" transform="translate(10072 774)" fill={colorLabelE} />
                  <path id="Union_4" data-name="Union 4" d="M145,0l32,24L145,48ZM0,48V0H145V48Z" transform="translate(10072 714)" fill={colorLabelD} />
                  <path id="Union_5" data-name="Union 5" d="M170,0l32,24L170,48ZM0,48V0H170V48Z" transform="translate(10072 654)" fill={colorLabelC} />
                  <path id="Union_6" data-name="Union 6" d="M195,0l32,24L195,48ZM0,48V0H195V48Z" transform="translate(10072 594)" fill={colorLabelB} />
                  <path id="Union_7" data-name="Union 7" d="M220,0l32,24L220,48ZM0,48V0H220V48Z" transform="translate(10072 534)" fill={colorLabelA} />
                  <path id="Union_8" data-name="Union 8" d="M245,0l32,24L245,48ZM0,48V0H245V48Z" transform="translate(10072 474)" fill={colorLabelA1} />
                  <path id="Union_9" data-name="Union 9" d="M270,0l32,24L270,48ZM0,48V0H270V48Z" transform="translate(10072 414)" fill={colorLabelA2} />
                  <text id="G" transform="translate(10082 929)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">G</tspan></text>
                  <text id="F" transform="translate(10082 869)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">F</tspan></text>
                  <text id="E" transform="translate(10082 809)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">E</tspan></text>
                  <text id="D" transform="translate(10082 749)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">D</tspan></text>
                  <text id="C" transform="translate(10082 689)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">C</tspan></text>
                  <text id="B" transform="translate(10082 629)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">B</tspan></text>
                  <text id="A" transform="translate(10082 569)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">A</tspan></text>
                  <text id="A_" data-name="A+" transform="translate(10082 509)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">A+</tspan></text>
                  <text id="A_2" data-name="A++" transform="translate(10082 449)" fill="#fff" stroke="#fff" strokeWidth="1" fontSize="30" fontFamily="Roboto-Regular, Roboto, sans-serif"><tspan x="0" y="0">A++</tspan></text>
                  <g id="Group_25" data-name="Group 25" transform={`translate(10063 ${waterLabelArrowYCoordinate})`}>
                    <line id="Line_5" data-name="Line 5" x2="60.43" transform="translate(342.9 515.533)" fill="none" stroke="#707070" strokeWidth="5"/>
                    <g id="Polygon_2" data-name="Polygon 2" transform="translate(335.5 531.565) rotate(-90)" fill="#707070">
                      <path d="M 31.20817565917969 27.86530303955078 L 0.8569532632827759 27.86530303955078 L 16.03256416320801 1.016144275665283 L 31.20817565917969 27.86530303955078 Z" stroke="none"/>
                      <path d="M 16.03256416320801 2.032285690307617 L 1.713901519775391 27.36530303955078 L 30.35122680664063 27.36530303955078 L 16.03256416320801 2.032285690307617 M 16.03256416320801 3.814697265625e-06 L 32.06512451171875 28.36530303955078 L 3.814697265625e-06 28.36530303955078 L 16.03256416320801 3.814697265625e-06 Z" stroke="none" fill="#707070"/>
                    </g>
                  </g>
                </g>
              </svg>
              {selectedAddress!==null// && buildingGeoJSON!==null
                ? <MapBuilding
                  selectedAddress={selectedAddress}
                  buildingGeoJSON={buildingGeoJSON}
                  waterLabelColor={waterLabelColor}
                />
                : null
              }
              
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
              // className="Desktop StandardButton NieuwLabelOpslaan"
              className={
                !guiShowEmail &&
                !guiShowSuccesSave
                ?
                "Desktop StandardButton NieuwLabelOpslaan Alert"
                :
                "Desktop StandardButton NieuwLabelOpslaan"
              }
              
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