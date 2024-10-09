import React, { useState, useEffect } from 'react';
import SelectClue from './SelectClue';
import Board from './Board';
import { getRandomNumber } from '../utils';
import { clues } from '../constants';

function App() {
  const [number, setNumber] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [score, setScore] = useState(0);
  const [numberList, setNumberList] = useState([]);
  const [guess, setGuess] = useState(0);
  const [clueList, setClueList] = useState(clues);

  const generateBoard = () => {
    let workNumberList = [];
    for (let i = 1; i < 101; i++) {
      workNumberList.push(i);
    }
    setNumberList(workNumberList);
  };

  const restart = () => {
    setNumber(0);
    console.clear();
  };

  useEffect(() => {
    setNumber(getRandomNumber(1, 100));
    generateBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const processClues = () => {
    console.log('process clues button');
    setScore(score + 5)
  };

  const guessButton = () => {
    console.log('guess button');
    if (number === guess) {
      setErrorMessage('You guessed the number. Well done!')
    }
  };

  const gotoBoard = () => {
    showClues === true ? setShowClues(false) : setShowClues(true)
  };

  function aboutButton() {
    let alertMessage =
      'The App will generate a random number from 1 to 100. Your job is to guess that number. ' +
      'There are a series of clues you can select to reduce the number of choices you have left. ' +
      'Each guess adds 1 to your score. Each clue adds 5 to your score. Try to get a low score.  ';
    alert(alertMessage);
  }

  return (
    <div>
      <div className="App">
        <h1>Guess the Number</h1>
        <div className="score"> Score: {score}</div>
        <div>{errorMessage}</div>
        <button onClick={() => aboutButton()}>
        About
      </button>
      <button onClick={() => guessButton()}>
        Guess
      </button>
      </div>
      <p>Pick a CLUE to help you</p>
      {!showClues ? (
        <div>
          <SelectClue
            setErrorMessage={setErrorMessage}
            setGuess={setGuess}
            clueList={clueList}
            setClueList={setClueList}
            numberList={numberList}
            setNumberList={setNumberList}
          />
        </div>
      ) : (
        <div>
          <Board
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            numberList={numberList}
          />
        </div>
      )}
      <button onClick={() => restart()}>Restart</button>
      <button onClick={() => processClues()}>Process Clue</button>
      <button onClick={() => gotoBoard()}>Show Numbers</button>
    </div>
  );
}

export default App;
