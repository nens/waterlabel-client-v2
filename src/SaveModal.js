import React from 'react';
import './SaveModal.css';
import LoadingIcon from "./LoadingIcon";
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions'


export default SaveModal;
function SaveModal (props) {

  const {
    saveWaterlabelState,
    email,
    setEmail,
    setGuiHideEmail,
    saveLabel,
    closeModal,
    guiShowEmail,
    guiShowSuccesSave,
  } = props;

  return (
    <div
      className="ModalSave"
      style={
        guiShowEmail | guiShowSuccesSave ?
        {}
        :
        {display: "none"}
      }
    >
          <div
            className={saveWaterlabelState == "SEND" ? 
              "SpinnerContainer Visible" 
              : 
              "SpinnerContainer Invisible" 
            }
          >
            <LoadingIcon
              singleColor={"white"}
              size={50}
            />
            <div>Opslaan label</div>
          </div>

          <form
            className="Email"
            style={
              saveWaterlabelState !== "RECEIVED" ?
              {}
              :
              {display: "none"}
            }
          >
            {/* <div> */}
              <h1>Bijna klaar!</h1>
              <label htmlFor="email">
                Om uw label op te slaan hebben wij uw email adres nodig ter controle.
              </label>
              <input
                id="email"
                value={email}
                placeholder="Voer hier uw email adres in"
                onChange={
                  event=>setEmail(event.target.value)
                }
              />
              <div
                className="ErrorText"
                style={
                  saveWaterlabelState === "FAILED" ?
                  {}
                  :
                  {display: "none"}
                }
              >
                Oepsie.. Er ging iets mis bij het opslaan van het label
              </div>
            <div
              className="Row"
            >
              <button
                className="StandardButton Annuleer"
                onClick={e=>{
                  e.preventDefault();
                  setGuiHideEmail();
                }}
              >
                ANNULEER
              </button>
              <button
                className="StandardButton Verzend"
                onClick={e=>{
                  e.preventDefault();
                  saveLabel();
                }}
              >
                VERZEND
              </button>
            </div>
          </form>
          <form
            className="Back"
            style={
              saveWaterlabelState === "RECEIVED" ?
              {}
              :
              {display: "none"} 
            }
          >
            <h1>Gelukt!</h1>
            <div>Dank u wel voor het deelnemen aan het waterlabel initiatief!</div>
            <button
                className="StandardButton"
                onClick={e=>{
                  e.preventDefault();
                  closeModal(_=>{
                    const elmnt = document.getElementsByClassName("App")[0]
                    scrollElementIntoViewWorkaround(elmnt);
                  });
                }}
              >
              TERUG
            </button>
          </form>
        </div>
  );
}