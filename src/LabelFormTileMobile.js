import React from 'react';
import LabelFormMobile from "./LabelFormMobile";
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions';


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
    tileClassName,
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
    className={`Mobile Tile ${tileClassName}`}
    style={
      assetTypeFetchState === "RECEIVED" &&
      ( latestWaterlabel || editedWaterlabel || editedFinishedWaterlabel ) &&
      (
      guiLabelTab === TabName ||
      guiLabelTab === null ||
      (guiLabelTab !== TabName && editedWaterlabel ===null)
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
        setGuiLabelTab(TabName, _ => {
          const elmnt = document.getElementsByClassName(tileClassName)[0];
          scrollElementIntoViewWorkaround(elmnt);
        });
                  
      }}
      className={
        guiLabelTab === TabName && editedWaterlabel !== null ? "TabActive Tab" : "Tab TabInActive" 
      }
    >
      <span>
        <img src={tabImage} alt="" width="36px"/>
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

