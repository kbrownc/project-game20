import React from 'react';
import { errorMessages } from '../constants';

const SelectClue = ({
  setErrorMessage,
  guess,
  setGuess,
  clueList,
  setClueList,
  numberList,
  setNumberList,
  numberToGuess,
  score,
  setScore,
}) => {
  const editClueInput = (e, i) => {
    console.log('numberToGuess', numberToGuess);
    let value = e.target.value.replace(/[^0-9]/gi, '');
    if (i === 2 || i === 4 || i === 5 || i === 6 || i === 7) {
      value = e.target.value;
    }
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    setClueList(workClueList);
  };

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setGuess(value);
  };

  function handleCheckboxChange(i) {
    console.log(clueList);
    let workClueList = [...clueList];
    if (workClueList[i].used === false) {
      workClueList[i].used = true;
    } else {
      workClueList[i].used = false;
    }
    if (workClueList[i].clueInput === '') {
      setErrorMessage('Input not supplied for this clue');
      workClueList[i].used = false;
    }
    removeNumbers(i, workClueList);
    setClueList(workClueList);
    setScore(score + 5);
  }

  function removeNumbers(i, workClueList) {
    let workNumberList = [...numberList];
    if (errorCheck(i, workClueList[i], workNumberList)) return;
    for (let j = 0; j < workNumberList.length; j++) {
      if (removeNumbersfunction(workClueList[i], workNumberList, j)) {
        workNumberList.splice(j, 1);
        j--;
      }
    }
    setNumberList(workNumberList);
  }

  function errorCheck(i, workClueList, workNumberList) {
    if (errorCheckfunction(workClueList, workNumberList)) {
      setErrorMessage(errorMessages[i]);
      return true;
    } else {
      setErrorMessage('');
      return false;
    }
  }

  // Did you select the correct option
  function errorCheckfunction(workClueList, workNumberList) {
    let clueTest;
    if (workClueList.id === '1') clueTest = numberToGuess % workClueList.clueInput !== 0;
    if (workClueList.id === '2')
      clueTest =
        (numberToGuess < 10 && workClueList.clueInput === '2') ||
        (numberToGuess > 9 && workClueList.clueInput === '1');
    if (workClueList.id === '3')
      clueTest =
        (numberToGuess < 51 && workClueList.clueInput === 'higher') ||
        (numberToGuess > 49 && workClueList.clueInput === 'lower');
    if (workClueList.id === '4')
      clueTest =
        numberToGuess < parseInt(workClueList.clueInput) - 10 ||
        numberToGuess > parseInt(workClueList.clueInput) + 10;
    if (workClueList.id === '5')
      clueTest =
        (hasRepeatingdigits(numberToGuess) && workClueList.clueInput === 'no dup)') ||
        (!hasRepeatingdigits(numberToGuess) && workClueList.clueInput === 'has dup)');
    if (workClueList.id === '6')
      clueTest =
        (isAscening(numberToGuess) && workClueList.clueInput !== 'ascending') ||
        (!isAscening(numberToGuess) && workClueList.clueInput === 'ascending');
    if (workClueList.id === '7')
      clueTest =
        (isExactSquareRoot(numberToGuess) && workClueList.clueInput !== 'is') ||
        (!isExactSquareRoot(numberToGuess) && workClueList.clueInput === 'is');
    if (workClueList.id === '8')
      clueTest =
        (isEvenOrOddDigits(numberToGuess) && workClueList.clueInput !== 'evenOdd') ||
        (!isEvenOrOddDigits(numberToGuess) && workClueList.clueInput === 'evenOdd');
    return clueTest;
  }

  function removeNumbersfunction(workClueList, workNumberList, j) {
    let clueTest;
    if (workClueList.id === '1') clueTest = workNumberList[j] % workClueList.clueInput !== 0 ? true : false;
    if (workClueList.id === '2')
      clueTest =
        (workClueList.clueInput === '1' && workNumberList[j] > 9) ||
        (workClueList.clueInput === '2' && workNumberList[j] < 10);
    if (workClueList.id === '3')
      clueTest = (workClueList.clueInput === 'lower' && workNumberList[j] < 51)(
        workClueList.clueInput === 'higher' && workNumberList[j] > 50
      );
    if (workClueList.id === '4')
      clueTest =
        workNumberList[j] < parseInt(workClueList.clueInput) - 10 ||
        workNumberList[j] > parseInt(workClueList.clueInput) + 10;
    if (workClueList.id === '5')
      clueTest =
        (!hasRepeatingdigits(workNumberList[j]) && workClueList.clueInput === 'has dup') ||
        (hasRepeatingdigits(workNumberList[j]) && workClueList.clueInput === 'no dup');
    if (workClueList.id === '6')
      clueTest =
        (isAscening(workNumberList[j]) && workClueList.clueInput === 'ascending') ||
        (!isAscening(workNumberList[j]) && workClueList.clueInput === 'descending');
    if (workClueList.id === '7')
      clueTest =
        (isExactSquareRoot(workNumberList[j]) && workClueList.clueInput === 'is') ||
        (!isExactSquareRoot(workNumberList[j]) && workClueList.clueInput === 'is not');
    if (workClueList.id === '8')
      clueTest =
        (isEvenOrOddDigits(workNumberList[j]) && workClueList.clueInput === 'evenOdd') ||
        (!isEvenOrOddDigits(workNumberList[j]) && workClueList.clueInput === 'mixed');
    return clueTest;
  }

  function hasRepeatingdigits(N) {
    return /([0-9]).*?\1/.test(N);
  }

  function isAscening(N) {
    const asc = /^0*1*2*3*4*5*6*7*8*9*$/;
    if (asc.test(N)) {
      return true;
    } else {
      return false;
    }
  }

  function isExactSquareRoot(N) {
    let x = Math.sqrt(N);
    if (x - Math.trunc(x) === 0) {
      return true;
    } else {
      return false;
    }
  }

  function isEvenOrOddDigits(N) {
    let NArray = N.toString().split('');
    let evenOdd = '';
    let evenOrOdd = false;
    for (let k = 0; k < NArray.length; k++) {
      if (k === 0) {
        if (NArray[k] % 2 === 0) {
          evenOdd = 'even';
        } else {
          evenOdd = 'odd';
        }
      } else {
        if (NArray[k] % 2 === 0 && evenOdd === 'even') {
          evenOrOdd = true;
        } else {
          if (NArray[k] % 2 !== 0 && evenOdd === 'odd') {
            evenOrOdd = true;
          }
        }
      }
    }
    return evenOrOdd;
  }

  return (
    <>
      <br />
      <div>
        {clueList.map((clue, i) => (
          <div key={clue.clue}>
            <input
              type="checkbox"
              name="select"
              key="{clue.clue}"
              checked={clueList.filter(item => item.id === clue.id)[0].used === true ? 'checked' : ''}
              value={clueList.filter(item => item.clue === clue.clue)}
              onChange={() => handleCheckboxChange(i)}
            />
            <label className="modal-label">{clue.clue}</label>
            {clue.needsInput ? (
              <input
                required
                name="value"
                className="selected"
                type="text"
                value={clue.clueInput}
                maxLength="2"
                onChange={e => editClueInput(e, i)}
              />
            ) : (
              <select className="clueSelect" onChange={e => editClueInput(e, i)}>
                {clue.validInput.map((valid, i) => (
                  <option key={i} value={valid}>
                    {valid}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <br />
        <label>Guess</label>
        <input
          required
          name="value"
          className="selected"
          type="text"
          value={guess || ''}
          maxLength="2"
          onChange={editGuess}
        />
      </div>
    </>
  );
};

export default SelectClue;
