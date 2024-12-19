import React from 'react';

const Square = ({number, i}) => {
  let formattedNumber = number.toString().padStart(2, '0'); 

  return (
      ((i+1) %10) === 0 ? (<><span> {formattedNumber}  </span><br /></>) : (<span> {formattedNumber} </span>) 
  );
};

export default Square;
