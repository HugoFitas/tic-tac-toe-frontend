import Square from "./Square";

const Board = () => {
  const squares = [...Array(9).keys()];

  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square index={index} />
      ))}
    </div>
  );
};

export default Board;
