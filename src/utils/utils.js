export function chunkArray(array) {
    // This function will split an array into thirds
    // input -[0, 1, 2, 3, 4, 5, 6, 7, 8]
    // output [0, 1, 2], [3, 4, 5] [6, 7, 8]
    const chunks = []
    for (let i = 0; i < array.length; i += 3) {
        chunks.push(array.slice(i,i + 3).map((item, index) => ({
        item,
        index: i+index
        })))
    };
    return chunks;
}
  
export function calculateBoardWinner(squares) {
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
  
export function calculateWinner(boards) {
    let boardWinners = boards.map((x) => calculateBoardWinner(x));
    return calculateBoardWinner(boardWinners)
}