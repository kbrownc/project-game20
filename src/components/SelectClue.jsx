import React from 'react';

const SelectClue = ({
  setErrorMessage,
  guess,
  setGuess,
  clueList,
  setClueList,
  numberList,
  setNumberList,
  number,
  score,
  setScore
}) => {
  const editClueInput = (e, i) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    setClueList(workClueList);
  };

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    console.log('clue', guess, value, typeof value, typeof guess);
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
      if (number % workClueList[i].clueInput !== 0) {
        setErrorMessage('Number not divisible by chosen number');
        console.log('not divisible',number,workClueList[i].clueInput)
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workNumberList[j] % workClueList[i].clueInput !== 0) {
            workNumberList.splice(j,1)
          }
        }
        console.log('divisible',number,workClueList[i].clueInput)
        setNumberList(workNumberList)
      }
    }
    if (workClueList[i].id === '2') {
      if ((number < 10 && workClueList[i].clueInput === '2') ||
          (number > 9 && workClueList[i].clueInput === '1')) {
        setErrorMessage('Number has a different number of digits than that selected');
        console.log('not divisible',number,workClueList[i].clueInput)
      } else {
        for (let j = 0; j < workNumberList.length; j++) {
          if (workClueList[i].clueInput === '1' && workNumberList[j] > 9) {
            workNumberList.splice(j,1)
          }
          if (workClueList[i].clueInput === '2' && workNumberList[j] < 10) {
            workNumberList.splice(j,1)
          }
        }
        console.log('1 or 2 digit',number,workClueList[i].clueInput)
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
              <select onChange={e => editClueInput(e, i)}>
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
