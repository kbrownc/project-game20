import Square from './Square';

const Board = ({ errorMessage, setErrorMessage, numberList }) => {
  
  return (
    <div>
      <div className="board">Remaining numbers:</div>
      <div>
        {numberList.map((number, i) => (
          <Square key={i} number={number} i={i}/>
        ))}
      </div>
    </div>
  );
};

export default Board;
