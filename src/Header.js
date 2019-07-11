import React from 'react';
import FormattedAddress from './FormattedAddress';

export default function Header (props) {

    const {
      foundAddressesList,
      backToAddressSearchForm,
      selectedAddress,
      setGuiShowBackModal,
      editedFinishedWaterlabel,
      editedWaterlabel,
    } = props;

    return (
      // {/*_______________________________________ BACK BUTTON */}
      <div
        className="AddressHeader"
        style={ foundAddressesList.length !== 0 ? {} : {display:"none"}}
      >
      <button
        
        onClick={_ =>{
          if (
            editedFinishedWaterlabel || editedWaterlabel
          ) {
            setGuiShowBackModal(true);
          } else {
            backToAddressSearchForm();
          }
          
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