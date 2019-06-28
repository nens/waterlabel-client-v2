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
                  e.preventDefault();
                  setGuiHideEmail();
                }}
              >
                Annuleer
              </button>
              <button
                onClick={e=>{
                  e.preventDefault();
                  saveLabel();
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
                  e.preventDefault();
                  closeModal();
                }}
              >
              Terug
            </button>
          </form>
        </div>
  );
}