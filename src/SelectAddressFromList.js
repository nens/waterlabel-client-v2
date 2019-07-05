import React from 'react';
import {scrollElementIntoViewWorkaround} from './utils/browserFunctions'

export default SelectAddressFromList;

 function SelectAddressFromList (props) {

  const {
    foundAddressesList,
    selectedAddress,
    searchAddressState,
    selectAddress,
  } = props;

  return (
    <div
      style={
        foundAddressesList.length !== 0 &&
        selectedAddress === null 
        ? 
        {} 
        : 
        {display: "none"} 
      }
    >
      <div
        className="SelectAddressFromList"
      >
        <form
        style={
          foundAddressesList.length !== 0 &&
          selectedAddress === null 
          ? 
          {} 
          : 
          {display: "none"} 
        }
        >
          <div>
            {/* <span>{searchAddressState}</span> */}
            <legend>Selecteer het gewenste adres</legend>
            <ul>
            {
              foundAddressesList.map(address=>{
                return (
                  <li
                    key={address.housenumber + address.street}
                  >
                    <button
                      className="StandardButton"
                      onClick={e =>{
                        e.preventDefault();
                        selectAddress(address, _=> {
                          const elmnt = document.getElementsByClassName("App")[0]
                          scrollElementIntoViewWorkaround(elmnt);
                        })
                      }}
                    >
                      <div>
                        <span>{address.street}</span>
                        <span>{" "}</span>
                        <span>{address.housenumber}</span>
                        <span style={address.houseletter?{}:{display:"none"}}>{" "} </span>
                        <span style={address.houseletter?{}:{display:"none"}}>{address.houseletter}</span>
                      {/* </div>
                      <div> */}
                        <span>{", "}</span>
                        <span>{address.postalcode}</span>
                        <span>{" "}</span>
                        <span>{address.city}</span>
                      </div>
                    </button>
                    
                  </li>
                );
              })
            }
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}