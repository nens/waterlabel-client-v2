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
          e.preventDefault();
          setGuiLabelTab("Dak");          
        }}
        className={guiLabelTab === "Dak" ? "TabActive" :  ""}
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Tuin");          
        }}
        className={guiLabelTab === "Tuin" ? "TabActive" :  ""}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          e.preventDefault();
          setGuiLabelTab("Voorziening");
          
        }}
        className={guiLabelTab === "Voorziening" ? "TabActive" :  ""}
      >
        Mijn voorzieningen
      </button>
    </div>
  );
}