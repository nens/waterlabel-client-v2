import React from 'react';
export default Header;

 function Header (props) {

    const {
      foundAddressesList,
      backToAddressSearchForm,
      selectedAddress,
    } = props;

    return (
      // {/*_______________________________________ BACK BUTTON */}
      <div
        className="AddressHeader"
        style={ foundAddressesList.length !== 0 ? {} : {display:"none"}}
      >
      <button
        
        onClick={_ =>{
          backToAddressSearchForm();
        }}
      >
        {"←"}
      </button>
      {/* Flex wrapper */}
      <div>
        {/*_______________________________________ SELECTED ADDRESS */}
        <div
          className="SelectedAddress"
          style={
            selectedAddress !== null 
            ? 
            {} 
            : 
            {visibility: "hidden"} 
          }
        >
          <div>
            <span>{selectedAddress && selectedAddress.houseaddresses[0].street}</span>
            <span>{" "} </span>
            <span>{selectedAddress && selectedAddress.houseaddresses[0].housenumber}</span>
          </div>
          <div>
          <span>{selectedAddress && selectedAddress.houseaddresses[0].postalcode}</span>
          <span>{" "} </span>
          <span>{selectedAddress && selectedAddress.houseaddresses[0].city}</span>
          </div>
        </div>
        </div>
      </div>
    )
 }