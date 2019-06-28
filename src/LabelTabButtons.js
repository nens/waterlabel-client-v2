import React from 'react';

export default LabelTabButtons;

function LabelTabButtons (props) {

  const { 
    guiLabelTab,
    setGuiLabelTab,
    setNewAssetTypeMustBeSelected,
  } = props;

  return (
    <div>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Dak");
          setNewAssetTypeMustBeSelected(false);
          
        }}
        className={guiLabelTab === "Dak" ? "TabActive" :  ""}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Tuin");
          setNewAssetTypeMustBeSelected(false);
          
        }}
        className={guiLabelTab === "Tuin" ? "TabActive" :  ""}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Voorziening");
          setNewAssetTypeMustBeSelected(false);
          
        }}
        className={guiLabelTab === "Voorziening" ? "TabActive" :  ""}
      >
        Mijn voorzieningen
      </button>
    </div>
  );
}