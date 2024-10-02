import React, { useState, useEffect } from 'react';
import SelectClue from './Select';
import Board from './Board';
import { clueList } from '../constants';
import { getRandomNumber } from '../utils';

function App() {
  const [number, setNumber] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const restart = () => {
    setNumber(0);
    console.clear();
  };

  useEffect(() => {
    console.log(getRandomNumber(1, 100))
    //setNumber(getRandomNumber(1, 100));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const continueGame = () => {
    console.log('continue button');
  };

  const gotoBoard = () => {
    showClues === true ? setShowClues(false) : setShowClues(true)
  };

  function alertButton() {
    let alertMessage =
      'The App will generate a random letter in a random position on the 1st row ' +
      'and before displaying, will ensure there is at least 20 valid words that fit in that constraint. ' +
      'Player completes their word and selects the ‘ADD’ button. The word is verified to be 1) a valid ' +
      'word 2) not a duplicate 3) has 1 and only 1 duplicate letter with the word above it.\nPlayer ' +
      'random letter for every row.';
    alert(alertMessage);
  }

  return (
    <div>
      <div className="App">
        <h1>Guess the Number</h1>
        <button className="alertButton" onClick={() => alertButton()}>
        About
      </button>
      </div>
      <p>Pick a CLUE to help you</p>
      {!showClues ? (
        <div>
          <SelectClue
            setNumber={setNumber}
            setShowClues={setShowClues}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : (
        <div>
          <Board
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      )}
      <button onClick={() => restart()}>Restart</button>
      <button onClick={() => continueGame()}>Continue</button>
      <button onClick={() => gotoBoard()}>Numbers</button>
    </div>
  );
}

export default App;
