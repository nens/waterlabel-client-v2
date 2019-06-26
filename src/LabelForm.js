import React from 'react';

function LabelForm (props) {

  const { 
    assetTypesFromServer,
    latestWaterlabel,
    editedWaterlabel,
    guiLabelTab,
    createNewLabel,
    changeLabel,
    saveLabel,
    setGuiLabelTab,
  } = props;

  return <div>
    <h1>Title LabelForm</h1>

    <div>
      <button
        onClick={e=>{
          createNewLabel();
          e.preventDefault();
        }}
        style={
          latestWaterlabel === null &&
          editedWaterlabel === null ?
          {}
          :
          {display: "none"}
        }
      >
        Nieuw Label
      </button>

      <button
        onClick={e=>{
          saveLabel();
          e.preventDefault();
        }}
        style={
          editedWaterlabel != null ?
          {}
          :
          {display: "none"}
        }
      >
        Label Opslaan
      </button>
      <button
        onClick={e=>{
          changeLabel();
          e.preventDefault();
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
    </div>
        
    <div>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "DAK"})
          setGuiLabelTab("DAK");
          e.preventDefault();
        }}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "TUIN"})
          setGuiLabelTab("TUIN");
          e.preventDefault();
        }}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          // this.setState({guiLabelTab: "VOORZIENING"})
          setGuiLabelTab("VOORZIENING");
          e.preventDefault();
        }}
      >
        Mijn voorzieningen
      </button>
    </div>
    <div>
      <h4>guiLabelTab: {guiLabelTab}</h4>
    </div>
  </div>
}

export default LabelForm;