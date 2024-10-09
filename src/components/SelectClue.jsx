import React from 'react';

const SelectClue = ({ setErrorMessage, setGuess, clueList, setClueList, numberList, setNumberList }) => {

  const editClueInput = (e, i) => {
    //const value = e.target.value.replace(/[^0-9]/gi, '');
    const value = e.target.value;
    if (clueList[i].id === 1 && (value !== '2' && value !== '')) {
      setErrorMessage('Input not valid for this clue');
      return
    }
    let workClueList = [...clueList];
    workClueList[i].clueInput = value;
    console.log('workClueList',workClueList)
    setClueList(workClueList)
  };

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value === 0 || value > 100) {
      setErrorMessage('Number cannot be 0 or greater than 100');
    }
    setErrorMessage('Error Message Guess');
    setGuess(value);
  };

  function handleCheckboxChange(i) {
    console.log('clueList',clueList,i)
    let workClueList = [...clueList];
    if (workClueList[i].used === false) {
      workClueList[i].used = true
    }
    setClueList(workClueList)
  }

  return (
    <>
      <br />
      <div>
        {clueList.map((clue,i) => (
          <div key={clue.clue}>
            <input
              type="checkbox"
              name="select"
              key="{clue.clue}"
              checked={clueList.filter(item => item.clue === clue.clue).used === true ? 'checked' : ''}
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
                maxLength="3"
                onChange={(e) => editClueInput(e,i)}
              />
            ) : null}
          </div>
        ))}
        <br />
        <label >Guess</label>
        <input
                required
                name="value"
                className="selected"
                type="text"
                value={''}
                maxLength="3"
                onChange={editGuess}
              />
      </div>
    </>
  );
};

export default SelectClue;
