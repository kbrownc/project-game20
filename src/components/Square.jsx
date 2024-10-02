import React from 'react';

const Square = ({number}) => {

console.log('numner',number)
  return (
    //<span>{number}</span>
      (number %10) === 0 ? (<><span>{number}</span><br /></>) : (<span>{number}</span>) 
  );
};

export default Square;
