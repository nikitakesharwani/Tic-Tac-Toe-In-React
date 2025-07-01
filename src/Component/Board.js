import { useState } from "react";

function Square({ value, onStateClick }) {
  return (
    <button className="square" onClick={onStateClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [XIsNext, setXIsNext] = useState(true);
  const [square, setSquares] = useState(Array(9).fill(null));
  console.log("Square", square);

  const handleClick = (i) => {
    console.log("Square Inside handle click", square[i]);
    if (square[i] || CalculateWinner(square)) return;

    const nextSquare = square.slice();

    if (XIsNext) nextSquare[i] = "X";
    else nextSquare[i] = "O";

    console.log("Next Square", nextSquare);
    setSquares(nextSquare);
    setXIsNext(!XIsNext);
  };

  const winner = CalculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (XIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[0]} onStateClick={() => handleClick(0)} />
        <Square value={square[1]} onStateClick={() => handleClick(1)} />
        <Square value={square[2]} onStateClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onStateClick={() => handleClick(3)} />
        <Square value={square[4]} onStateClick={() => handleClick(4)} />
        <Square value={square[5]} onStateClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onStateClick={() => handleClick(6)} />
        <Square value={square[7]} onStateClick={() => handleClick(7)} />
        <Square value={square[8]} onStateClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function CalculateWinner(square) {
  const lists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lists.length; i++) {
    const [a, b, c] = lists[i];
    if (square[a] && square[a] == square[b] && square[a] == square[c]) {
      return square[a];
    }
  }
  return null;
}
