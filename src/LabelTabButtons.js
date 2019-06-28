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
      >
        Mijn dak
      </button>
      <button
        onClick={e=>{
          setGuiLabelTab("Tuin");
          e.preventDefault();
        }}
      >
        Mijn tuin
      </button>
      <button
        onClick={e=>{
          setGuiLabelTab("Voorziening");
          e.preventDefault();
        }}
      >
        Mijn voorzieningen
      </button>
    </div>
  );
}