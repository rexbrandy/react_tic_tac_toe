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
    // handles what happens when you click on a square - if valid then assign value
    if ((gameToPlay && boardNumber != gameToPlay) || squares[i] || winner) {// || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice() // Create copy of squares array
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O';

    onPlay(nextSquares, boardNumber, i);
  }

  function renderBoard(boardArray) {
    // Splits game squares arrray into chunks of 3 then renders them between 'board-row' div tags
    const chunks = [];
    for (let i = 0; i < boardArray.length; i += 3) {
      chunks.push( boardArray.slice(i, i + 3).map((item, index) => ({
        item,
        index: i + index,
      })));
    }
    return chunks.map((chunk) => (
      <div key={'board'+boardNumber} className='board-row'>
        {chunk.map(({item, index}) => (
          <Square value={item} onSquareClick={() => handleClick(index)}/>
        ))}
      </div>
    ))
  }
  
  const winner = calculateBoardWinner(squares);
  let boardToRender = squares;
  let winnerClass = null;
  if (winner === 'O') {
    boardToRender = [null, winner, null, winner, null, winner, null, winner];
    winnerClass = 'o-winner';
  } else if (winner === 'X') {
    boardToRender = [winner, null, winner, null, winner, null, winner, null, winner];
    winnerClass = 'x-winner';
  }

  return (
      <>
        <div className={'mini-board '+winnerClass}>
          {renderBoard(boardToRender)}
        </div>
      </>
    )
}


export default function Game() {
  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill(null)));
  /*useState(Array(9).fill({
    'winner': null,
    'squares': Array(9).fill(null),
  }));*/
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
