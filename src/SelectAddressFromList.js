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
      <hr/>
      <div>
        <span>{searchAddressState}</span>
        <div>Found Addresses:</div>
        <ul>
        {
          foundAddressesList.map(address=>{
            return (
              <li
                key={address.houseaddresses[0].housenumber}
                onClick={_ =>{
                  selectAddress(address)
                }}
              >
                <span>{address.houseaddresses[0].street}</span>
                <span>{address.houseaddresses[0].housenumber}</span>
              </li>
            );
          })
        }
        </ul>
      </div>
    </form>
  );
}