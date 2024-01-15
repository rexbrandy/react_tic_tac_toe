import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({xIsNext, squares, onPlay, boardNumber, gameToPlay}) {
  function handleClick(i) {
    if ((gameToPlay && boardNumber != gameToPlay) || squares[i] || winner) {// || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice() // Create copy of squares array
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';

    onPlay(nextSquares, boardNumber, i);
  }
  
  const winner = calculateBoardWinner(squares);
  if (winner === 'O') {
    const wonBoard = [null, winner, null, winner, null, winner, null, winner]
    return (
      <>
        <div className='mini-board'>
          <div className='board-row'>
            <Square value={wonBoard[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={wonBoard[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={wonBoard[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className='board-row'>
            <Square value={wonBoard[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={wonBoard[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={wonBoard[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className='board-row'>
            <Square value={wonBoard[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={wonBoard[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={wonBoard[8]} onSquareClick={() => handleClick(8)}/>
          </div>
        </div>
      </>
    )
  } else if (winner === 'X'){
    const wonBoard = [winner, null, winner, null, winner, null, winner, null, winner]
    return (
      <>
        <div className='mini-board'>
          <div className='board-row'>
            <Square classExtras={['top', 'left']} value={wonBoard[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={wonBoard[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={wonBoard[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className='board-row'>
            <Square value={wonBoard[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={wonBoard[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={wonBoard[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className='board-row'>
            <Square value={wonBoard[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={wonBoard[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={wonBoard[8]} onSquareClick={() => handleClick(8)}/>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='mini-board'>
          <div className='board-row'>
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className='board-row'>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className='board-row'>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
          </div>
        </div>
      </>
    )
  }
}


export default function Game() {
  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill(null)));
  const [gameToPlay, setGameToPlay] = useState(null);
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(boards);

  // handle play
  function handlePlay(nextSquares, boardNumber, nextGame) {
    if (winner) {
      return;
    }

    let nextBoards = boards.slice();

    nextBoards[boardNumber] = nextSquares;
    setBoards(nextBoards);
    setXIsNext(!xIsNext);

    if (calculateBoardWinner(boards[nextGame])) {
      setGameToPlay(null);
    } else {
      setGameToPlay(nextGame);
    }
  }

  const gameInfo = () => {
    if (winner) {
      return (
        <div>Winner: {winner}</div>
      )
    }
    return (
      <>
        <div>Player: {xIsNext ? 'X' : 'O'}</div>
        <div>Game to play: {gameToPlay != null  ? gameToPlay+1 : 'Anywhere'}</div>
      </>
    )
  }

  return (
    <div className='game'>
      <div className='game-board'>
      <div className='game-board-row'>
          <Board xIsNext={xIsNext} squares={boards[0]} onPlay={handlePlay} boardNumber={0} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[1]} onPlay={handlePlay} boardNumber={1} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[2]} onPlay={handlePlay} boardNumber={2} gameToPlay={gameToPlay}/>
        </div>
        <div className='game-board-row middle-row'>
          <Board xIsNext={xIsNext} squares={boards[3]} onPlay={handlePlay} boardNumber={3} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[4]} onPlay={handlePlay} boardNumber={4} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[5]} onPlay={handlePlay} boardNumber={5} gameToPlay={gameToPlay}/>
        </div>
        <div className='game-board-row'>
          <Board xIsNext={xIsNext} squares={boards[6]} onPlay={handlePlay} boardNumber={6} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[7]} onPlay={handlePlay} boardNumber={7} gameToPlay={gameToPlay}/>
          <Board xIsNext={xIsNext} squares={boards[8]} onPlay={handlePlay} boardNumber={8} gameToPlay={gameToPlay}/>
        </div>
      </div>
      <div className='game-info'>
        <ul>
          {gameInfo()}
        </ul>
      </div>
    </div>
  )
}

function calculateBoardWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateWinner(boards) {
  let boardWinners = boards.map((x) => calculateBoardWinner(x));
  return calculateBoardWinner(boardWinners)
}
