import React, { useState, useEffect } from 'react';
import SelectClue from './SelectClue';
import Board from './Board';
import { getRandomNumber } from '../utils';
import { clues } from '../constants';

function App() {
  const [numberToGuess, setNumberToGuess] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [score, setScore] = useState(0);
  const [numberList, setNumberList] = useState([]);
  const [guess, setGuess] = useState('');
  const [clueList, setClueList] = useState(clues);

  const generateBoard = () => {
    let workNumberList = [];
    for (let i = 1; i < 100; i++) {
      workNumberList.push(i);
    }
    setNumberList(workNumberList);
  };

  const restart = () => {
    setNumberToGuess(getRandomNumber(1, 100));
    setShowClues(false);
    setErrorMessage('');
    setScore(0);
    setNumberList([]);
    generateBoard();
    setGuess('');
    setClueList(clues);
    console.clear();
  };

  useEffect(() => {
    setNumberToGuess(getRandomNumber(1, 100));
    generateBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const guessButton = () => {
    if (guess === '0') {
      setErrorMessage('Number cannot be 0 or greater than 100');
      return;
    }
    if (guess !== numberToGuess) {
      setErrorMessage('Your guess was not correct');
      return;
    }
    if (numberToGuess === guess) {
      setErrorMessage('You guessed the number. Well done!');
      return;
    }
  };

  const gotoBoard = () => {
    showClues === true ? setShowClues(false) : setShowClues(true);
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
      </div>
      <p>Pick a CLUE to help you</p>
      {!showClues ? (
        <div>
          <button onClick={() => aboutButton()}>About</button>
          <button onClick={() => guessButton()}>Guess</button>
          <div>
            <SelectClue
              setErrorMessage={setErrorMessage}
              guess={guess}
              setGuess={setGuess}
              clueList={clueList}
              setClueList={setClueList}
              numberList={numberList}
              setNumberList={setNumberList}
              numberToGuess={numberToGuess}
              score={score}
              setScore={setScore}
            />
          </div>
        </div>
      ) : (
        <div>
          <Board errorMessage={errorMessage} setErrorMessage={setErrorMessage} numberList={numberList} />
        </div>
      )}
      <button onClick={() => restart()}>Restart</button>
      <button onClick={() => gotoBoard()}>{showClues ? 'Show Clues' : 'Show Numbers'}</button>
    </div>
  );
}

export default App;
