import { useState } from 'react';
import Board from './components/Board';
import {chunkArray, calculateBoardWinner, calculateWinner} from './utils/utils';

// TODO
// - Make boards array of objects that hold board squares and winner status (x/o/null)
// - Decide if board winner should be decided in Board or Game
// - Add play agiain button
// - Refactor code
// - Components for Square, Board, etc


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
          <Board key={'board'+index} xIsNext={xIsNext} squares={item} onPlay={handlePlay} boardNumber={index} gameToPlay={gameToPlay} winner={winner}/>
        ))}
      </div>
    ))
  }

  const gameInfo = () => {
    if (winner) {
      return (
        <div>
          <div>Winner: {winner}</div>
        </div>
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