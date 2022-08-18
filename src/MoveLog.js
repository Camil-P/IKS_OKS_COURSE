const MoveLog = ({ moveLog, setGameState }) => {
  console.log(moveLog);
  return (
    <ul>
      {moveLog.map((move) => (
        <li key={move.i.toString() + move.j.toString()}>
          {console.log(move.moveIndex)}
          <a onClick={() => setGameState(move.moveIndex)}>
            Igrac {move.player} je odigrao potez na poziciji: {move.i}:{move.j}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MoveLog;
