import {useState} from 'react';


function Square({ value, onSquareClick }) {
  return ( 
    <button className="square" onClick={onSquareClick}>
     {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function squareClickHandler(i) {
    if (squares[i] || evaluateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'; 

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  const winner = evaluateWinner(squares);
  let status;
  if (winner) {
    status = "The winner is - " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className="row">
        <Square value={squares[0]} onSquareClick={() => squareClickHandler(0)} />
        <Square value={squares[1]} onSquareClick={() => squareClickHandler(1)} />
        <Square value={squares[2]} onSquareClick={() => squareClickHandler(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onSquareClick={() => squareClickHandler(3)} />
        <Square value={squares[4]} onSquareClick={() => squareClickHandler(4)} />
        <Square value={squares[5]} onSquareClick={() => squareClickHandler(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onSquareClick={() => squareClickHandler(6)} />
        <Square value={squares[7]} onSquareClick={() => squareClickHandler(7)} />
        <Square value={squares[8]} onSquareClick={() => squareClickHandler(8)} />
      </div>
    </>
  );
}

function evaluateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
for (let i = 0; i< lines.length; i++) {
  const [a, b, c] = lines[i];
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a];
  }
 }
 return null;
}