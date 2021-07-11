const Square = ({ index, value, handleClick }) => {
  return (
    <>
      <button className="square" onClick={() => handleClick(index)}>
        {value[index]}
      </button>
    </>
  );
};

export default Square;
