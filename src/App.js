import { useState } from "react";
import "./App.css";

const winningCombinations = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["02", "11", "20"],
];

const Game = () => {
  const [XO, setXO] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [winningPlayer, setWinningPlayer] = useState("");

  const handleOnClick = (element) => {
    let xoCopy = [...XO];
    // let xoCopy = [      <--- isto ko linija iznad
    //               ["X", null, "O"],
    //               [null, "X", null],
    //               [null, "X", null]]

    // if (xoCopy[element.id[0]][element.id[1]] === null)
    if (winningPlayer === "") {
      if (!xoCopy[element.id[0]][element.id[1]]) {
        if (isFirstPlayer) {
          xoCopy[element.id[0]][element.id[1]] = "X";
        } else {
          xoCopy[element.id[0]][element.id[1]] = "O";
        }

        setXO(xoCopy);
        setIsFirstPlayer(!isFirstPlayer);
      }
    }

    const winner = whoWon();

    if (winner !== null) {
      setWinningPlayer(winner + " is a winner");
    }
  };

  const whoWon = () => {
    let winningPlayer = null;

    winningCombinations.forEach((wc) => {
      let combination = [];
      wc.forEach((sqr) => {
        combination.push(XO[sqr[0]][sqr[1]]);
      });

      if (
        combination[0] === combination[1] &&
        combination[0] === combination[2]
      ) {
        winningPlayer = combination[0];
      }
    });
    return winningPlayer;
  };

  return (
    <div>
      <h1>{winningPlayer}</h1>
      {XO.map((row, i) => {
        return (
          <div key={row.toString() + i.toString()} className="row">
            {row.map((square, j) => {
              return (
                <div
                  key={square + j.toString()}
                  id={i.toString() + j.toString()}
                  onClick={(el) => handleOnClick(el.target)}
                  className="square"
                >
                  {square}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>

    // <div>
    //   <div className="row">
    //     <div className="square"></div>
    //     <div className="square"></div>
    //     <div className="square"></div>
    //   </div>
    //   <div className="row">
    //     <div className="square"></div>
    //     <div className="square"></div>
    //     <div className="square"></div>
    //   </div>
    //   <div className="row">
    //     <div className="square"></div>
    //     <div className="square"></div>
    //     <div className="square"></div>
    //   </div>
    // </div>
  );
};

export default Game;
