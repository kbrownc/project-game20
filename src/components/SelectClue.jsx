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
}) => {
  const editClueInput = (e, i) => {
    //const value = e.target.value.replace(/[^0-9]/gi, '');
    const value = e.target.value;
    if (clueList[i].needsInput) {
      console.log('freeform input')
    }
    if (clueList[i].id === 1 && value !== '2' && value !== '5' && value !== '') {
      setErrorMessage('Input not valid for this clue');
      return;
    }
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    //console.log('workClueList',workClueList,value,i)
    setClueList(workClueList);
  };

  const editGuess = e => {
    //const value = e.target.value.replace(/[^0-9]/gi, '');
    const value = e.target.value;
    console.log('clue', guess, value, typeof value, typeof guess);
    setGuess(value);
  };

  function handleCheckboxChange(i) {
    //console.log('clueList',clueList,i)
    let workClueList = [...clueList];
    if (workClueList[i].used === false) {
      workClueList[i].used = true;
    } else {
      workClueList[i].used = false;
    }
    setClueList(workClueList);
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
