import React from 'react';

const Square = ({number}) => {

  return (
      (number %10) === 0 ? (<><span>{number} </span><br /></>) : (<span>{number} </span>) 
  );
};

export default Square;
