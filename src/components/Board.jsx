import React, { useState, useEffect } from 'react';
import Square from './Square';

const Board = ({ errorMessage, setErrorMessage }) => {
  const [score, setScore] = useState(0);
  const [numberList, setNumberList] = useState([]);

  const generateBoard = () => {
    let workNumberList = [];
    for (let i = 1; i < 101; i++) {
      workNumberList.push(i);
    }
    setNumberList(workNumberList);
    console.log(workNumberList);
  };

  useEffect(() => {
    generateBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="score"> Score: {score}</div>
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
