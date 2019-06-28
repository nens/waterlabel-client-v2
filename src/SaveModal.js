import React from 'react';

export default SaveModal;

function SaveModal (props) {

  const {
    saveWaterlabelState,
    email,
    setEmail,
    setGuiHideEmail,
    saveLabel,
    closeModal,
  } = props;

  return (
    <div>
          <hr/>
          <form
            style={
              saveWaterlabelState !== "RECEIVED" ?
              {}
              :
              {display: "none"}
            }
          >
            <div>
              <label htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                value={email}
                onChange={
                  event=>setEmail(event.target.value)
                }
              />
            </div>
            <div>
              {saveWaterlabelState + ''}
            </div>
            <div>
              <button
                onClick={e=>{
                  setGuiHideEmail();
                  e.preventDefault();
                }}
              >
                Annuleer
              </button>
              <button
                onClick={e=>{
                  saveLabel();
                  e.preventDefault();
                }}
              >
                Verzend
              </button>
            </div>
          </form>
          <form
            style={
              saveWaterlabelState === "RECEIVED" ?
              {}
              :
              {display: "none"} 
            }
          >
            <button
                onClick={e=>{
                  closeModal();
                  e.preventDefault();
                }}
              >
              Terug
            </button>
          </form>
        </div>
  );
}