import { useState } from 'react';

// TODO
// - Make boards array of objects that hold board squares and winner status (x/o/null)
// - Decide if board winner should be decided in Board or Game

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
    const chunks = chunkArray(boardArray);

    return chunks.map((chunk) => (
      <div key={'board'+boardNumber} className='board-row'>
        {chunk.map(({item, index}) => (
          <Square key={'square'+index} value={item} onSquareClick={() => handleClick(index)}/>
        ))}
      </div>
    ))
  }
  
  const winner = calculateBoardWinner(squares);
  let boardToRender = squares;
  let winnerClass = '';
  if (winner === 'O') {
    boardToRender = [null, winner, null, winner, null, winner, null, winner, null];
    winnerClass = 'o-winner';
  } else if (winner === 'X') {
    boardToRender = [winner, null, winner, null, winner, null, winner, null, winner];
    winnerClass = 'x-winner';
  }

  return (
      <>
        <div className={'mini-board '+ (boardNumber % 3 === 1 ? 'middle-col ' : '') +  winnerClass }>
          {renderBoard(boardToRender)}
        </div>
      </>
    )
}


export default function Game() {
  const [boards, setBoards] = useState(Array(9).fill(Array(9).fill(null))); // boards - this is the position of the game
  /*useState(Array(9).fill({
    'winner': null,
    'squares': Array(9).fill(null),
  }));*/
  const [gameToPlay, setGameToPlay] = useState(null); // next game to play
  const [xIsNext, setXIsNext] = useState(true); // which players turn

  const winner = calculateWinner(boards);

  // handlePlay()
  // This function is the main game loop.
  // This is given to each Board instance to handle the gameplay.
  // nextSquares = Array(9) - this is the updated position of a smaller board
  // boardNumber = Int - this is the index of board that was played on
  // nextHame = Int - this is the index of the square that was clicked, this will be the next board to be played on
  function handlePlay(nextSquares, boardNumber, nextGame) {
    // If there is a winner end the game
    if (winner) {
      return;
    }

    // Make copy of the boards
    // This will be used to update the boards in the game
    let nextBoards = boards.slice();

    // In the copy of the game we update the board that was played on
    nextBoards[boardNumber] = nextSquares;
    // Update the boards for next loop
    setBoards(nextBoards);
    // Give turn to next player
    setXIsNext(!xIsNext);

    // If the smaller board is won, the next player can play anywhere
    // Otherwise they must play in the corresponding board
    if (calculateBoardWinner(boards[nextGame])) {
      setGameToPlay(null);
    } else {
      setGameToPlay(nextGame);
    }
  }

  function renderGame() {
    const chunks = chunkArray(boards);

    return chunks.map((chunk, rowIndex) => (
      <div key={'row'+rowIndex} className={rowIndex === 1 ? 'game-board-row middle-row' : 'game-board-row'}>
        {chunk.map(({item, index}) => (
          <Board key={'board'+index} xIsNext={xIsNext} squares={item} onPlay={handlePlay} boardNumber={index} gameToPlay={gameToPlay}/>
        ))}
      </div>
    ))
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
        {renderGame()}
      </div>
      <div className='game-info'>
        <ul>
          {gameInfo()}
        </ul>
      </div>
    </div>
  )
}

function chunkArray(array) {
  const chunks = []
  for (let i = 0; i < array.length; i += 3) {
    chunks.push(array.slice(i,i + 3).map((item, index) => ({
      item,
      index: i+index
    })))
  };
  return chunks;
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
