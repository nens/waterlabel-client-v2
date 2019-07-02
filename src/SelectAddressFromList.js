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
        <div>Selecteer het gewenste adres</div>
        <ul>
        {
          foundAddressesList.map(address=>{
            return (
              <li
                key={address.houseaddresses[0].housenumber}
              >
                <button
                  onClick={e =>{
                    e.preventDefault();
                    selectAddress(address)
                  }}
                >
                  <div>
                    <span>{address.houseaddresses[0].street}</span>
                    <span>{" "}</span>
                    <span>{address.houseaddresses[0].housenumber}</span>
                  </div>
                  <div>
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
  );
}