import React from 'react';
// import './SaveModal.css';
import LoadingIcon from "./LoadingIcon";
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions'


export default function BackModal (props) {

  const {
    backToAddressSearchForm,
    guiShowBackModal,
    setGuiShowBackModal
  } = props;

  return (
    <div
      className="ModalBack"
      style={
        guiShowBackModal ?
        {}
        :
        {display: "none"}
      }
    >

          <form
            className="BackConfirm"
          >
            {/* <div> */}
              <h1>Label niet opgeslagen. Weet u het zeker?</h1>
              <p>
                Als u nu terug gaat wordt uw aangepaste label niet opgeslagen!
                <br/>
                Al uw wijzigingen gaan dan verloren!
              </p>
              
            <div
              className="Row"
            >
              <button
                className="StandardButton Blijf"
                onClick={e=>{
                  e.preventDefault();
                  setGuiShowBackModal(false);
                }}
              >
                BLIJF BIJ LABEL
              </button>
              <button
                className="StandardButton DoNotSave"
                onClick={e=>{
                  e.preventDefault();
                  setGuiShowBackModal(false);
                  backToAddressSearchForm();
                }}
              >
                WIJZIGING NIET OPSLAAN
              </button>
            </div>
          </form>
        </div>
  );
}