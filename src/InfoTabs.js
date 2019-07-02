import React from 'react';

export default InfoTabs;

function InfoTabs (props) {

  const { 
    guiInfoTab,
    setInfoTab,
  } = props;

  return (
      <div
        className="InfoTabContainer"
      >
        <div
          className={guiInfoTab === "PERSONAL" ? "TabActive InfoTabContainer" :  "InfoTabContainer"}
        >
          <button
            className="StandardTile"
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "PERSONAL") {
                setInfoTab("PERSONAL");
              }
              else {
                setInfoTab(null);
              }
            }}
          >
            Persoonlijke tips voor een beter label
          </button>
          <div
            className="StandardTile Info"
            style={guiInfoTab==="PERSONAL"? {} : {display: "none"}}
          >
            <pre>U hebt label D, dit kan dus beter! Persoonlijke tips op basis van uw statistieken: - Plaats een regenton in de tuin voor extra opvang. - Maak van uw dak een groen dak. - Verwijder tegels uit uw tuin voor extra opvang.</pre>
          </div>
        </div>
        <div
          className={guiInfoTab === "CALCULATION" ? "TabActive InfoTabContainer" :  "InfoTabContainer"}
        >
          <button
            className="StandardTile"
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "CALCULATION") {
                setInfoTab("CALCULATION");
              }
              else {
                setInfoTab(null);
              }
            }}
          >
            Uitleg berekening
          </button>
          <div
            className="StandardTile Info"
            style={guiInfoTab==="CALCULATION"? {} : {display: "none"}}
          >
            <pre>Hier komt een text die de berekening uitlegt.</pre>
          </div>
          
        </div>
        <div
          className={guiInfoTab === "WHY" ? "TabActive InfoTabContainer" :  "InfoTabContainer"}
        >
          <button
            className="StandardTile"
            onClick={e=>{
              e.preventDefault();
              if (guiInfoTab !== "WHY") {
                setInfoTab("WHY");
              }
              else {
                setInfoTab(null);
              }
            }}
          >
            Waarom het waterlabel?
          </button>
          <div
            className="StandardTile Info"
            style={guiInfoTab==="WHY"? {} : {display: "none"}}
          >
            <pre>Hevige neerslag gaat steeds vaker voorkomen. Om de wateroverlast in de stad te beperken moet de overheid maatregelen nemen. Ook burgers kunnen maatregelen treffen om hun stad klimaatbestendiger te maken. Om de burger bewuster te maken is het regenwaterlabel, kortweg waterlabel, voor woningen ontwikkeld. Het waterlabel geeft informatie over de capaciteit van een huis / tuin om water vast te houden. Dit label is een initiatief van De Waag, de gemeente Rotterdam en Huisje Boompje Beter.</pre>
          </div>
        </div>
        {/* <div>
            <div
              style={guiInfoTab==="PERSONAL"? {} : {display: "none"}}
            >
              Personal text
            </div>
            <div
              style={guiInfoTab==="CALCULATION"? {} : {display: "none"}}
            >
              CALCULATION X Y
            </div>
            <div
              style={guiInfoTab==="WHY"? {} : {display: "none"}}
            >
              WHY DID WE MAKE WATER LABEL ??
            </div>
            
          </div> */}
      </div>
    );
  }