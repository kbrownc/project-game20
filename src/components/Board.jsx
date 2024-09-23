import React, { useState } from 'react';
//import Square from './Square';
//import useBoard from './useBoard';

const Board = ({
  errorMessage,
  setErrorMessage,
}) => {
  const [score, setScore] = useState(0);
  //const [words, setWords, addLetter] = useBoard(wordLengths);

  return (
    <div>
      <div className="score"> Score: {score}</div>
      <div className="board">
        board
      </div>
    </div>
  );
};

export default Board;
