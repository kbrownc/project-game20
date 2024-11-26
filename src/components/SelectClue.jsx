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
    if (i === 2 || i === 4) {
      value = e.target.value;
    }
    console.log('value', value);
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    setClueList(workClueList);
    console.log('input', workClueList);
  };

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setGuess(value);
  };

  function handleCheckboxChange(i) {
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
    //removeNumbers(i, workClueList);
    removeNumbers2(i, workClueList);
    setClueList(workClueList);
    setScore(score + 5);
  }

  function removeNumbers2(i, workClueList) {
    let workNumberList = [...numberList];
    if (errorCheck(workClueList[i],workNumberList)) return
    for (let j = 0; j < workNumberList.length; j++) {
      if (removeNumbersfunction(workClueList[i],workNumberList,j)) {   
        workNumberList.splice(j, 1);
        j--;
      }
    }
    setNumberList(workNumberList);
  }

  function errorCheck(i, workClueList,workNumberList) {
    if (errorCheckfunction(workClueList[i],workNumberList)) {  
      setErrorMessage(errorMessages[i]);
      return true
    } else {
      setErrorMessage('');
      return false
    }
  }

  function errorCheckfunction(workClueList,workNumberList) {
    let clueTest;
    if (workClueList.id === '1') clueTest = numberToGuess % workClueList.clueInput !== 0
    if (workClueList.id === '2') clueTest = (numberToGuess < 10 && workClueList.clueInput === '2') ||
                 (numberToGuess > 9 && workClueList.clueInput === '1')
    if (workClueList.id === '3') clueTest = (numberToGuess < 51 && workClueList.clueInput === 'higher') ||
                 (numberToGuess > 49 && workClueList.clueInput === 'lower')
    if (workClueList.id === '4') clueTest = false
    if (workClueList.id === '5') clueTest = false
    if (workClueList.id === '6') clueTest = false
    if (workClueList.id === '7') clueTest = false
    if (workClueList.id === '8') clueTest = false
    return clueTest  
  }

  function removeNumbersfunction(workClueList,workNumberList,j) {
    let clueTest;
    if (workClueList.id === '1') clueTest = workNumberList[j] % workClueList.clueInput !== 0 ? true : false
    if (workClueList.id === '2') clueTest = (workClueList.clueInput === '1' && workNumberList[j] > 9) 
                 (workClueList.clueInput === '2' && workNumberList[j] < 10)
    if (workClueList.id === '3') clueTest = (workClueList.clueInput === 'lower' && workNumberList[j] < 51) 
                 (workClueList.clueInput === 'higher' && workNumberList[j] > 50)
    if (workClueList.id === '4') clueTest = false
    if (workClueList.id === '5') clueTest = false
    if (workClueList.id === '6') clueTest = false
    if (workClueList.id === '7') clueTest = false
    if (workClueList.id === '8') clueTest = false
    return clueTest
  }

  function removeNumbers(i, workClueList) {
    let workNumberList = [...numberList];

    if (workClueList[i].id === '1') {
      if (numberToGuess % workClueList[i].clueInput !== 0) {
        setErrorMessage('Number not divisible by chosen number');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workNumberList[j] % workClueList[i].clueInput !== 0) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
    if (workClueList[i].id === '2') {
      if (
        (numberToGuess < 10 && workClueList[i].clueInput === '2') ||
        (numberToGuess > 9 && workClueList[i].clueInput === '1')
      ) {
        setErrorMessage('Number has a different number of digits than that selected');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workClueList[i].clueInput === '1' && workNumberList[j] > 9) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
          if (workClueList[i].clueInput === '2' && workNumberList[j] < 10) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
    if (workClueList[i].id === '3') {
      if (
        (numberToGuess < 51 && workClueList[i].clueInput === 'higher') ||
        (numberToGuess > 49 && workClueList[i].clueInput === 'lower')
      ) {
        setErrorMessage('Number is lower-higher than 50 and you guessed wrong');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workClueList[i].clueInput === 'lower' && workNumberList[j] < 51) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
          if (workClueList[i].clueInput === 'higher' && workNumberList[j] > 50) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
    if (workClueList[i].id === '4') {
      if (
        numberToGuess < parseInt(workClueList[i].clueInput) - 10 ||
        numberToGuess > parseInt(workClueList[i].clueInput) + 10
      ) {
        setErrorMessage('Number is not within 10 pf the number you guessed');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (
            workNumberList[j] < parseInt(workClueList[i].clueInput) - 10 ||
            workNumberList[j] > parseInt(workClueList[i].clueInput) + 10
          ) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
    if (workClueList[i].id === '5') {
      if (
        (hasRepeatingdigits(numberToGuess) && workClueList[i].clueInput === 'no dup)') ||
        (!hasRepeatingdigits(numberToGuess) && workClueList[i].clueInput === 'has dup)')
      ) {
        setErrorMessage('Number has-has not got dup digits');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (
            (!hasRepeatingdigits(workNumberList[j]) && workClueList[i].clueInput === 'has dup') ||
            (hasRepeatingdigits(workNumberList[j]) && workClueList[i].clueInput === 'no dup')
          ) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
    if (workClueList[i].id === '6') {
      console.log('numberToGuess', numberToGuess);
      if (
        (hasRepeatingdigits(numberToGuess) && workClueList[i].clueInput === 'no dup)') ||
        (!hasRepeatingdigits(numberToGuess) && workClueList[i].clueInput === 'has dup)')
      ) {
        setErrorMessage('Number has-has not got dup digits');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (
            (!hasRepeatingdigits(workNumberList[j]) && workClueList[i].clueInput === 'has dup') ||
            (hasRepeatingdigits(workNumberList[j]) && workClueList[i].clueInput === 'no dup')
          ) {
            workNumberList.splice(j, 1);
            j--;
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList);
      }
    }
  }

  function hasRepeatingdigits(N) {
    return /([0-9]).*?\1/.test(N);
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
