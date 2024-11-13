import React from 'react';

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
  setScore
}) => {
  const editClueInput = (e, i) => {
    console.log('numberToGuess',numberToGuess)
    let value = e.target.value.replace(/[^0-9]/gi, '');
    if (i === 2) {value = e.target.value};
    console.log('value',value)
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    setClueList(workClueList);
    console.log('input',workClueList)
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
    removeNumbers(i,workClueList)
    setClueList(workClueList);
    setScore(score + 5);
  }

  function removeNumbers(i,workClueList) {
    let workNumberList = [...numberList];
    if (workClueList[i].id === '1') {
      if (numberToGuess % workClueList[i].clueInput !== 0) {
        setErrorMessage('Number not divisible by chosen number');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workNumberList[j] % workClueList[i].clueInput !== 0) {
            workNumberList.splice(j,1)
          }
        }
        setNumberList(workNumberList)
      }
    }
    if (workClueList[i].id === '2') {
      if ((numberToGuess < 10 && workClueList[i].clueInput === '2') ||
          (numberToGuess > 9 && workClueList[i].clueInput === '1')) {
        setErrorMessage('Number has a different number of digits than that selected');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workClueList[i].clueInput === '1' && workNumberList[j] > 9) {
            workNumberList.splice(j,1)
            j--
            setErrorMessage('');
          }
          if (workClueList[i].clueInput === '2' && workNumberList[j] < 10) {
            workNumberList.splice(j,1)
            j--
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList)
      }
    }
    if (workClueList[i].id === '3') {
      if ((numberToGuess < 51 && workClueList[i].clueInput === 'higher') ||
          (numberToGuess > 49 && workClueList[i].clueInput === 'lower')) {
        setErrorMessage('Number is lower-higher than 50 and you guessed wrong');
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workClueList[i].clueInput === 'lower' && workNumberList[j] < 51) {
            workNumberList.splice(j,1)
            j--
            setErrorMessage('');
          }
          if (workClueList[i].clueInput === 'higher' && workNumberList[j] > 50) {
            workNumberList.splice(j,1)
            j--
            setErrorMessage('');
          }
        }
        setNumberList(workNumberList)
      }
    }
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
                  <option key={i} value={valid}>{valid}</option>
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
