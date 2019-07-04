import React from 'react';
import LabelFormMobile from "./LabelFormMobile";


export default LabelFormTileMobile;

function LabelFormTileMobile (props) {

  const { 
    assetTypeFetchState,
    latestWaterlabel,
    editedWaterlabel,
    editedFinishedWaterlabel,
    guiLabelTab,
    setGuiLabelTab,
    changeLabel,
    tabImage,
    tabText,
    TabName,
    assetTypesFromServer,
    showLabelFormDetails,
    setShowLabelFormDetails,
    createNewLabel,
    setEditedWaterlabel,
    editingWaterlabelReady,
    computedWaterlabelState,
    computedWaterlabel,
  } = props;


  return (
    <div
    className="Tile"
    style={
      assetTypeFetchState === "RECEIVED" &&
      ( latestWaterlabel || editedWaterlabel || editedFinishedWaterlabel ) &&
      (
      guiLabelTab === TabName ||
      guiLabelTab === null 
      )
      ?
      {}
      :
      {display: "none"}
    }
  >
    <button
      onClick={e=>{
        e.preventDefault();
        setGuiLabelTab(TabName);
        changeLabel();          
      }}
      className={
        guiLabelTab === TabName ? "TabActive Tab" : "Tab TabInActive" 
      }
    >
      <span>
        <img src={tabImage} width="36px"/>
      </span>
      <span>{tabText}</span>
      <span
        className="PlusIcon"
      >
        +
      </span>
    </button>
    <div>
      <LabelFormMobile
        assetTypesFromServer={assetTypesFromServer}
        latestWaterlabel={latestWaterlabel}
        editedWaterlabel={editedWaterlabel}
        editedFinishedWaterlabel={editedFinishedWaterlabel}
        guiLabelTab={TabName}
        showLabelFormDetails={showLabelFormDetails}
        setShowLabelFormDetails={bool=>setShowLabelFormDetails(bool)}
        createNewLabel={createNewLabel}
        changeLabel={changeLabel}
        setGuiLabelTab={tab => setGuiLabelTab(tab)}
        setEditedWaterlabel={setEditedWaterlabel}
        editingWaterlabelReady={editingWaterlabelReady}
        computedWaterlabelState={computedWaterlabelState}
        computedWaterlabel={computedWaterlabel}
      />
    </div>
  </div>
  );
}

