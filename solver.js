
function findEmptyCell(board) {
    // Find the first empty cell in the board and return its coordinates [row, col]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null; // If no empty cell is found, return null
}

function isValidMove(board, row, col, num) {
    // Check if placing the given number in the given cell is a valid move
    return (
        isRowValid(board, row, num) &&
        isColValid(board, col, num) &&
        isBoxValid(board, row - (row % 3), col - (col % 3), num)
    );
}

function isRowValid(board, row, num) {
    // Check if the number is not present in the same row
    return !board[row].includes(num);
}

function isColValid(board, col, num) {
    // Check if the number is not present in the same column
    for (let row = 0; row < 9; row++) {
        if (board[row][col] === num) {
            return false;
        }
    }
    return true;
}

function isBoxValid(board, startRow, startCol, num) {
    // Check if the number is not present in the 3x3 box
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[startRow + row][startCol + col] === num) {
                return false;
            }
        }
    }
    return true;
}

export default function sudokuSolver(board) {
    const emptyCell = findEmptyCell(board);

    // puzzle solved when there is no empty cell
    if (!emptyCell) {
        return true;
    }

    const [row, col] = emptyCell;

    // Try filling the empty cell with numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            // If the move is valid, try placing the number
            board[row][col] = num;

            // Recursively try to solve the rest of the puzzle
            if (sudokuSolver(board)) {
                return true; // If the puzzle is solved, stop and return true
            }

            // If the current placement doesn't lead to a solution, backtrack
            board[row][col] = 0;
        }
    }

    // If no number can be placed in the current cell, backtrack
    return false;
}

/*
// Example usage:
const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

if (solveSudoku(sudokuBoard)) {
    console.log("Sudoku solved successfully:");
    console.log(sudokuBoard);
} else {
    console.log("No solution exists.");
}
*/ 