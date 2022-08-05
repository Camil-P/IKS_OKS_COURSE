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

  const handleOnClick = (i, j) => {
    // dekonstruisemo XO niz preko takozvanog spred operatora (...nekiNizIliObjekat) i onda te clanove
    // niza smestamo u niz [] i cuvamo ih u xoCopy variablu
    let xoCopy = [...XO];
    // let xoCopy = [      <--- isto ko linija iznad
    //               ["X", null, "O"],
    //               [null, "X", null],
    //               [null, "X", null]]

    if (winningPlayer === "") {
      // if (xoCopy[element.id[0]][element.id[1]] === null) <-- ekvivalentno liniji ispod
      if (!xoCopy[i][j]) {
        if (isFirstPlayer) {
          xoCopy[i][j] = "X";
        } else {
          xoCopy[i][j] = "O";
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
      let lineCombination = [];
      wc.forEach((sqr) => {
        lineCombination.push(XO[sqr[0]][sqr[1]]);
      });

      // Proveravamo da li je prvi clan potencialno pobednicke kombinacije razlicit od null
      // Zatim proveravamo da li je jednak clanu pored njega ("X" === "X")
      // Onda proveravamo da li je takodje jednak poslednjem (trecem) clanu u kombinaciji
      // Ako jeste onda imammo pobednika
      if (
        lineCombination[0] !== null &&
        lineCombination[0] === lineCombination[1] &&
        lineCombination[0] === lineCombination[2]
      ) {
        winningPlayer = lineCombination[0];
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
                  onClick={() => handleOnClick(i, j)}
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
