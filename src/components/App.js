import React, { useState } from 'react';
import SelectClue from './Select';
import Board from './Board';
import { clueList } from '../constants';

function App() {
  const [number, setNumber] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const restart = () => {
    setNumber(0);
    console.clear();
  };

  const continueGame = () => {
    console.log('continue button');
  };

  return (
    <div>
      <div className="App">
        <h1>Guess the Number</h1>
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
    </div>
  );
}

export default App;
