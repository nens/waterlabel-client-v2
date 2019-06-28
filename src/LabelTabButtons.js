import React from 'react';

export default LabelTabButtons;

function LabelTabButtons (props) {

  const { 
    guiLabelTab,
    setGuiLabelTab,
  } = props;

  return (
    <div>
      <button
        onClick={e=>{
          setGuiLabelTab("Dak");
          e.preventDefault();
        }}
        className={guiLabelTab === "Dak" ? "TabActive" :  ""}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          setGuiLabelTab("Tuin");
          e.preventDefault();
        }}
        className={guiLabelTab === "Tuin" ? "TabActive" :  ""}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          setGuiLabelTab("Voorziening");
          e.preventDefault();
        }}
        className={guiLabelTab === "Voorziening" ? "TabActive" :  ""}
      >
        Mijn voorzieningen
      </button>
    </div>
  );
}