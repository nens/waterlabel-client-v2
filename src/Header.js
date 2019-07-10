import React from 'react';
import FormattedAddress from './FormattedAddress';

export default function Header (props) {

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
        <div
          className="SelectedAddress"
        >
          {selectedAddress? <FormattedAddress address={selectedAddress}/> : null}
        </div>
        </div>
      </div>
    )
 }