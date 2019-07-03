import React from 'react';
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
                    key={address.houseaddresses[0].housenumber + address.houseaddresses[0].street}
                  >
                    <button
                      className="StandardButton"
                      onClick={e =>{
                        e.preventDefault();
                        selectAddress(address)
                      }}
                    >
                      <div>
                        <span>{address.houseaddresses[0].street}</span>
                        <span>{" "}</span>
                        <span>{address.houseaddresses[0].housenumber}</span>
                      {/* </div>
                      <div> */}
                        <span>{", "}</span>
                        <span>{address.houseaddresses[0].postalcode}</span>
                        <span>{" "}</span>
                        <span>{address.houseaddresses[0].city}</span>
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