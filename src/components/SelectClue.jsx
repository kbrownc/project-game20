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
    setScore(score - 5);
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
    //let clueTest = workClueList.find(({ id }) => workClueList.id === id).errCheck(numberToGuess, workClueList.clueInput);
    let clueTest = clues[i].errCheck(numberToGuess, clueInput);
    return clueTest;

    // let clueTest;
    // if (workClueList.id === '1') clueTest = numberToGuess % workClueList.clueInput !== 0;
    // if (workClueList.id === '2')
    //   clueTest =
    //     (numberToGuess < 10 && workClueList.clueInput === '2') ||
    //     (numberToGuess > 9 && workClueList.clueInput === '1');
    // if (workClueList.id === '3')
    //   clueTest =
    //     (numberToGuess < 51 && workClueList.clueInput === 'true') ||
    //     (numberToGuess > 50 && workClueList.clueInput === 'false');
    // if (workClueList.id === '4')
    //   clueTest =
    //     numberToGuess < parseInt(workClueList.clueInput) - 10 ||
    //     numberToGuess > parseInt(workClueList.clueInput) + 10;
    // if (workClueList.id === '5')
    //   clueTest =
    //     (hasRepeatingdigits(numberToGuess) && workClueList.clueInput === 'no dup') ||
    //     (!hasRepeatingdigits(numberToGuess) && workClueList.clueInput === 'has dup');
    // if (workClueList.id === '6')
    //   clueTest =
    //     (isAscening(numberToGuess) && workClueList.clueInput !== 'ascending') ||
    //     (!isAscening(numberToGuess) && workClueList.clueInput === 'ascending');
    // if (workClueList.id === '7')
    //   clueTest =
    //     (isExactSquareRoot(numberToGuess) && workClueList.clueInput !== 'is') ||
    //     (!isExactSquareRoot(numberToGuess) && workClueList.clueInput === 'is');
    // if (workClueList.id === '8')
    //   clueTest =
    //     (isEvenOrOddDigits(numberToGuess) && workClueList.clueInput !== 'evenOdd') ||
    //     (!isEvenOrOddDigits(numberToGuess) && workClueList.clueInput === 'evenOdd');
  }

  function removeNumbersfunction(i, workClueInput, workNumberList, j) {
    let clueTest = 
      //workClueList.find(({ id }) => workClueList.id === id).verifyCheck(workNumberList[j], workClueList.clueInput);
      clues[i].verifyCheck(workNumberList[j], workClueInput);
    return clueTest;

    // let clueTest;
    // if (workClueList.id === '1') clueTest = workNumberList[j] % workClueList.clueInput !== 0 ? true : false;
    // if (workClueList.id === '2')
    //   clueTest =
    //     (workClueList.clueInput === '1' && workNumberList[j] > 9) ||
    //     (workClueList.clueInput === '2' && workNumberList[j] < 10);
    // if (workClueList.id === '3')
    //   clueTest =
    //     ((workClueList.clueInput === 'false' && workNumberList[j] < 51) ||
    //       (workClueList.clueInput === 'true' && workNumberList[j] > 50)) &&
    //     workNumberList[j] !== numberToGuess;
    // if (workClueList.id === '4')
    //   clueTest =
    //     workNumberList[j] < parseInt(workClueList.clueInput) - 10 ||
    //     workNumberList[j] > parseInt(workClueList.clueInput) + 10;
    // if (workClueList.id === '5')
    //   clueTest =
    //     (!hasRepeatingdigits(workNumberList[j]) && workClueList.clueInput === 'has dup') ||
    //     (hasRepeatingdigits(workNumberList[j]) && workClueList.clueInput === 'no dup');
    // if (workClueList.id === '6')
    //   clueTest =
    //     (isAscening(workNumberList[j]) && workClueList.clueInput === 'descending') ||
    //     (!isAscening(workNumberList[j]) && workClueList.clueInput === 'ascending');
    // if (workClueList.id === '7')
    //   clueTest =
    //     (isExactSquareRoot(workNumberList[j]) && workClueList.clueInput === 'is not') ||
    //     (!isExactSquareRoot(workNumberList[j]) && workClueList.clueInput === 'is');
    // if (workClueList.id === '8')
    //   clueTest =
    //     (isEvenOrOddDigits(workNumberList[j]) && workClueList.clueInput === 'mixed') ||
    //       (!isEvenOrOddDigits(workNumberList[j]) && workClueList.clueInput === 'evenOdd');
    // return clueTest;
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
