import React, { useState, useEffect } from 'react';
import SelectClue from './SelectClue';
import Board from './Board';
import { getRandomNumber } from '../utils';

function App() {
  const [numberToGuess, setNumberToGuess] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [score, setScore] = useState(100);
  const [numberList, setNumberList] = useState([]);
  const [guess, setGuess] = useState('');
  const [guessClass, setGuessClass] = useState(false);
  const [clueUsed, setClueUsed] = useState([false,false,false,false,false,false,false,false]);
  const [clueInput, setClueInput] = useState(['','','','','','','','']);

  const generateBoard = () => {
    let workNumberList = [];
    for (let i = 1; i < 100; i++) {
      workNumberList.push(i);
    }
    setNumberList(workNumberList);
  };

  const restart = () => {
    setNumberToGuess(getRandomNumber(1, 99));
    // Test
    //setNumberToGuess(40);
    setShowClues(false);
    setErrorMessage('');
    setScore(100);
    setNumberList([]);
    generateBoard();
    setGuess('');
    setClueUsed([false,false,false,false,false,false,false,false]);
    setClueInput(['','','','','','','','']);
    resetOptionsInput();
    setGuessClass(false);
    console.clear();
  };

  const resetOptionsInput = () => {
    let clear = document.getElementsByClassName('clueSelect');
    for (let j = 0; j < clear.length; j++) {
      for (let k = 0; k < clear[j].length; k++) {
        if (clear[j].options[k].selected) {
          clear[j].options[k].selected = false;
        }
      }
    }
  };

  useEffect(() => {
    setNumberToGuess(getRandomNumber(1, 99));
    // Test
    //setNumberToGuess(3);
    //
    generateBoard();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const guessButton = () => {
    if (guess === '0') {
      setErrorMessage('Number cannot be 0');
      setGuess('');
      return;
    }
    if (Number(guess) !== numberToGuess) {
      setErrorMessage('Your guess was not correct');
      setGuess('');
      removeGuessNumber();
      return;
    }
    if (numberToGuess === Number(guess)) {
      setErrorMessage('You guessed the number. Well done!');
      setGuessClass(true)
      return;
    }
  };

  function removeGuessNumber() {
    let workNumberList = [...numberList];
    let index = workNumberList.indexOf(Number(guess));
    workNumberList.splice(index, 1);
    setNumberList(workNumberList);
    setScore(score - 1);
    setGuess('');
  }

  const gotoBoard = () => {
    showClues === true ? setShowClues(false) : setShowClues(true);
  };

  function aboutButton() {
    let alertMessage =
      'The App will generate a random number from 1 to 99. Your job is to guess that number. ' +
      'There are a series of clues you can select to reduce the number of choices you have left. ' +
      'Each guess removes 1 from your score. Each clue removes 5 from your score. Try to get a high score.  ' +
      'NOTE: Numbers where both digits are equal are considered ascending digits..  ';
    alert(alertMessage);
  }

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setGuess(value);
  };

  return (
    <div>
      <div className="App">
        <h1 className="title">Guess the Number</h1>
        <div className={guessClass ? 'guessed' : 'notGuessed'}>{errorMessage}</div>
      </div>
      {!showClues ? (
        <div>
          <div>
            <button onClick={() => guessButton()}>Guess</button>
            <input
              required
              name="value"
              className="selected"
              type="text"
              value={guess || ''}
              maxLength="2"
              onChange={editGuess}
            />
            <br />
            <br />
          </div>
          <span className="clue">Pick a CLUE to help you</span>
          <span className="score"> Score: {score}</span>
          <div>
            <SelectClue
              setErrorMessage={setErrorMessage}
              clueInput={clueInput}
              setClueInput={setClueInput}
              clueUsed={clueUsed}     
              setClueUsed={setClueUsed}     
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
      <button onClick={() => aboutButton()}>About</button>
      <button onClick={() => restart()}>Restart</button>
      <button onClick={() => gotoBoard()}>{showClues ? 'Show Clues' : 'Show Numbers'}</button>
    </div>
  );
}

export default App;
