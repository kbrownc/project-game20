import React from 'react';

const Square = ({number}) => {
  let formattedNumber = number.toString().padStart(2, '0'); 

  return (
      (number %10) === 0 ? (<><span> {formattedNumber}  </span><br /></>) : (<span> {formattedNumber} </span>) 
  );
};

export default Square;
