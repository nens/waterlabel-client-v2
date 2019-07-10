import React from 'react';

export default function FormattedAddress (props) {

  const {
    address,
  } = props;

  return (
    <div
      className="FormattedAddress"
    >
      <div>
        <span>{address.street}</span>
        <span>&nbsp;</span>
        <span>{address.housenumber}</span>
        <span style={address.housenumbersuffix?{}:{display:"none"}}>&nbsp;</span>
        <span style={address.housenumbersuffix?{}:{display:"none"}}>{address.housenumbersuffix}</span>
        <span>&nbsp;</span>
        <span style={address.houseletter?{}:{display:"none"}}>{address.houseletter}</span>
        <span>&nbsp;</span>
      </div>
      <div>
        <span>{address.postalcode}</span>
        <span>&nbsp;</span>
        <span>{address.city}</span>
      </div>
    </div>
  );
}