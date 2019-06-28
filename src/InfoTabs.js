import React from 'react';

export default InfoTabs;

function InfoTabs (props) {

  const { 
    guiInfoTab,
    setInfoTab,
  } = props;

  return (
      <div>
        <hr/>
        <div>
          <button
            onClick={e=>{
              e.preventDefault();
              setInfoTab("PERSONAL")
            }}
            className={guiInfoTab === "PERSONAL" ? "TabActive" :  ""}
          >
            Persoonlijke tips voor een beter label
          </button>
          <button
            onClick={e=>{
              e.preventDefault();
              setInfoTab("CALCULATION")
            }}
            className={guiInfoTab === "CALCULATION" ? "TabActive" :  ""}
          >
            Uitleg berekening
          </button>
          <button
            onClick={e=>{
              e.preventDefault();
              setInfoTab("WHY")
            }}
            className={guiInfoTab === "WHY" ? "TabActive" :  ""}
          >
            Waarom het waterlabel?
          </button>
        </div>
        <div>
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
            {/* {this.state.guiInfoTab==="PERSONAL"?
            <div>
              Personal text
            </div>
            :
            null
            }
            {this.state.guiInfoTab==="CALCULATION"?
            <div>
              CALCULATION text
            </div>
            :
            null
            }
            {this.state.guiInfoTab==="WHY"?
            <div>
              WHY text
            </div>
            :
            null
            } */}
          </div>
      </div>
    );
  }