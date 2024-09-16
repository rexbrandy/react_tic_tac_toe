import React from 'react';
import Square from './components/Square';

export default function Board({xIsNext, squares, onPlay, boardNumber, gameToPlay, winner}) {
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
    
    let boardToRender = squares;
    let winnerClass = '';
    if (winner === 'O') {
      boardToRender = [null, winner, null, winner, null, winner, null, winner, null];
      winnerClass = ' o-winner';
    } else if (winner === 'X') {
      boardToRender = [winner, null, winner, null, winner, null, winner, null, winner];
      winnerClass = ' x-winner';
    }
  
    return (
        <>
          <div className={'mini-board '+ (boardNumber % 3 === 1 ? 'middle-col ' : '') +  winnerClass }>
            {renderBoard(boardToRender)}
          </div>
        </>
      )
  }