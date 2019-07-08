import React from 'react';

export default LabelTabButtons;

function LabelTabButtons (props) {

  const { 
    guiLabelTab,
    setGuiLabelTab,
  } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Dak");          
        }}
        className={guiLabelTab === "Dak" ? "TabActive StandardTile" :  "StandardTile"}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Tuin");          
        }}
        className={guiLabelTab === "Tuin" ? "TabActive StandardTile" :  "StandardTile"}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Voorziening");
          
        }}
        className={guiLabelTab === "Voorziening" ? "TabActive StandardTile" :  "StandardTile"}
      >
        Mijn voorzieningen
      </button>
    </div>
  );
}