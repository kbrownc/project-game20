import React, { useState, useEffect } from 'react';
import Square from './Square';

const Board = ({ errorMessage, setErrorMessage, numberList }) => {
  
  return (
    <div>
      <div className="board">board</div>
      <div>
        {numberList.map((number, i) => (
          <Square key={i} number={number}/>
        ))}
      </div>
    </div>
  );
};

export default Board;
