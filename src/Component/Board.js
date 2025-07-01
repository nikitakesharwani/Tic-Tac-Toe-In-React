function Square({ value, onStateClick }) {
  return (
    <button className="square" onClick={onStateClick}>
      {value}
    </button>
  );
}

export default function Board({ xIsNext, squares, onPlay }) {
  const winner = CalculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onStateClick={() => handleClick(0)} />
        <Square value={squares[1]} onStateClick={() => handleClick(1)} />
        <Square value={squares[2]} onStateClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onStateClick={() => handleClick(3)} />
        <Square value={squares[4]} onStateClick={() => handleClick(4)} />
        <Square value={squares[5]} onStateClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onStateClick={() => handleClick(6)} />
        <Square value={squares[7]} onStateClick={() => handleClick(7)} />
        <Square value={squares[8]} onStateClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function CalculateWinner(squares) {
  if (!squares) return null;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
