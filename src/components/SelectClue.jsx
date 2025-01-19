import React from 'react';
import { errorMessages } from '../constants';
import { clues } from '../constants';

const SelectClue = ({
  setErrorMessage,
  clueInput,
  setClueInput,
  clueUsed,
  setClueUsed,
  numberList,
  setNumberList,
  numberToGuess,
  score,
  setScore,
}) => {
  const editClueInput = (e, i) => {
    console.log('numberToGuess', numberToGuess);
    let value = e.target.value.replace(/[^0-9]/gi, '');
    if (i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 7) {
      value = e.target.value;
    }
    let workClueInput = [...clueInput];
    workClueInput[i] = value;
    setClueInput(workClueInput);
  };

  function handleCheckboxChange(i) {
    let workClueUsed = [...clueUsed];
    if (clueInput[i] === '') {
      setErrorMessage('Input not supplied for this clue');
    } else {
      workClueUsed[i] = true;
      removeNumbers(i, clueInput);
    }
    setClueUsed(workClueUsed);
    setScore(score - 5);
  }

  function removeNumbers(i, clueInput) {
    let workNumberList = [...numberList];
    if (errorCheck(i, clueInput[i], workNumberList)) return;
    for (let j = 0; j < workNumberList.length; j++) {
      if (removeNumbersfunction(i, clueInput[i], workNumberList, j)) {
        workNumberList.splice(j, 1);
        j--;
      }
    }
    setNumberList(workNumberList);
  }

  function errorCheck(i, clueInput, workNumberList) {
    if (errorCheckfunction(i,clueInput, workNumberList)) {
      setErrorMessage(errorMessages[i]);
      return true;
    } else {
      setErrorMessage('');
      return false;
    }
  }

  // Did you select the correct option
  function errorCheckfunction(i, clueInput, workNumberList) {
    let clueTest = clues[i].errCheck(numberToGuess, clueInput);
    return clueTest;
  }

  function removeNumbersfunction(i, workClueInput, workNumberList, j) {
    let clueTest = clues[i].verifyCheck(workNumberList[j], workClueInput);
    return clueTest;
  }

  return (
    <>
      <br />
      <div>
        {clues.map((clue, i) =>
          !clueUsed[i] ? (
            <div key={clue.clue}>
              <input
                type="checkbox"
                name="select"
                key="{clue.clue}"
                checked={clueUsed[i] === true ? 'checked' : ''}
                value={clues.filter(item => item.clue === clue.clue)}
                onChange={() => handleCheckboxChange(i)}
              />
              <label>{clue.clue}</label>
              {clue.needsInput ? (
                <input
                  required
                  name="value"
                  className="selected"
                  type="text"
                  value={clueInput[i]}
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
          ) : null
        )}
        <br />
      </div>
    </>
  );
};

export default SelectClue;
