import "./App.css";
import Square from "./Square";

const Board = ({ gameState, handleClick }) => {
  return (
    <div>
      {gameState.map((row, i) => {
        return (
          <div key={row + i.toString()} className="row">
            {row.map((square, j) => (
              <Square
                key={square + j.toString()}
                square={square}
                handleClick={handleClick}
                i={i}
                j={j}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
