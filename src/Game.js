import { useState } from "react";
import "./App.css";
import Board from "./Board";
import MoveLog from "./MoveLog";
import Winner from "./Winner";

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
  const [moveLog, setMoveLog] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);

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
        setHistoryLog([...historyLog, XO]);
        setIsFirstPlayer(!isFirstPlayer);
        setMoveLog([
          ...moveLog,
          {
            player: isFirstPlayer ? "X" : "O",
            i,
            j,
            moveIndex: moveLog.length + 1,
          },
        ]);
      }
    }

    const winner = whoWon();

    if (winner !== null) {
      setWinningPlayer(winner + " is a winner");
    }
  };

  const setGame = (moveIndex) => {
    console.log(moveIndex);
    console.log(historyLog[moveIndex]);
    setXO(historyLog[moveIndex]);
  };

  const whoWon = () => {
    for (let i = 0; i < 8; i++) {
      // U prvoj iteraciji for petlje, ova vrednost je prvi niz unutar winningCombinations matrice
      // Odnosno ["00", "01", "02"]
      const oneWinningCombination = winningCombinations[i];

      // U prvoj iteraciji for petlje vrednosti su
      // firstIndexCombination = "00",
      // secondIndexCombination = "01",
      // i thirdIndexCombination = "02"
      const firstIndexCombination = oneWinningCombination[0];
      const secondIndexCombination = oneWinningCombination[1];
      const thirdIndexCombination = oneWinningCombination[2];

      // Na osnovu uzetih indexa u code-u iznad izvlacimo elemente iz matrice (koja reprezentuje XO tabelu)
      const firstElement =
        XO[firstIndexCombination[0]][firstIndexCombination[1]];
      const secondElement =
        XO[secondIndexCombination[0]][secondIndexCombination[1]];
      const thirdElement =
        XO[thirdIndexCombination[0]][thirdIndexCombination[1]];

      // Proveravamo prvi clan. Ako je on razlicit od praznog stringa,
      // odnosno igrac je kliknuo na to polje i upisao "X"/"O"
      // nakon toga proveravamo da li su drugi i treci clan jednaki prvom
      // Ako su sve provere tacne onda imamo pobednika kojeg vracamo i samim tim
      // prekidamo dalje iteriranje for petlje
      if (
        firstElement !== "" &&
        firstElement === secondElement &&
        secondElement === thirdElement
      ) {
        return firstElement;
      }
    }
  };

  return (
    <div>
      <Winner winner={winningPlayer} />
      <div style={{ display: "flex" }}>
        <Board gameState={XO} handleClick={handleOnClick} />
        <MoveLog moveLog={moveLog} setGameState={setGame} />
      </div>
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
