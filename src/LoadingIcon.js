import React from 'react';
import MDSpinner from "react-md-spinner";

export default LoadingIcon;

function LoadingIcon (props) {

  const { 
    singleColor,
    size,
  } = props;

  return (
    <MDSpinner 
      size={size}
      singleColor={singleColor}
    />
  );
}