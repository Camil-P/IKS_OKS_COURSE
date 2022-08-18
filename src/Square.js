const Square = ({ handleClick, i, j, square }) => {
  return (
    <div
      onClick={() => handleClick(i, j)}
      key={square + j.toString()}
      className="square"
    >
      {square}
    </div>
  );
};

export default Square;
