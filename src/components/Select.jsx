import React from 'react';
import { clueList } from '../constants';

const SelectClue = ({ setNumber, setShowBoard, setErrorMessage }) => {
  const editInput = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value > 20) return;
    if (value === '0') {
      setErrorMessage('Number of letters selected is 0');
    }
    setNumber(value);
  };

  const editGuess = e => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value > 20) return;
    if (value === '0') {
      setErrorMessage('Number of letters selected is 0');
    }
    setNumber(value);
  };

  function handleCheckboxChange(lth) {
    // let newWordLengths = [...wordLengths];
    // if (wordLengths.filter(item => item === lth).length > 0) {
    //   newWordLengths = wordLengths.filter(item => item !== lth);
    // } else {
    //   newWordLengths.push(lth);
    // }
    // setWordLengths(newWordLengths);
  }

  return (
    <>
      <br />
      <div>
        {clueList.map(clue => (
          <div key={clue.clue}>
            <input
              type="checkbox"
              name="select"
              key="{clue.clue}"
              checked={clueList.filter(item => item.clue === clue.clue).length > 0 ? 'checked' : ''}
              value={clueList.filter(item => item.clue === clue.clue)}
              onChange={() => handleCheckboxChange(clue)}
            />
            <label className="modal-label">{clue.clue}</label>
            {clue.needsInput ? (
              <input
                required
                name="value"
                className="selected"
                type="text"
                value={0}
                maxLength="3"
                onChange={editInput}
              />
            ) : null}
          </div>
        ))}
        <br />
        <label className="modal-label">Guess</label>
        <input
                required
                name="value"
                className="selected"
                type="text"
                value={0}
                maxLength="3"
                onChange={editGuess}
              />
      </div>
    </>
  );
};

export default SelectClue;
