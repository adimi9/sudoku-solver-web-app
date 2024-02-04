import sudokuSolver from "./solver.js";

let currentRow = 0; 
let currentCol = 0; 

function initBoard() {
    let board = document.getElementById("sudoku-board"); 

    for (let i = 0; i < 9; i++) {
        let row = document.createElement("div");
        row.className = "sudoku-row";

        for (let j = 0; j < 9; j++) {
            let box = document.createElement("div"); 
            box.classList.add("sudoku-box");
            box.setAttribute("data-row", i);
            box.setAttribute("data-col", j);
            row.appendChild(box);

            box.addEventListener("click", () => {
                handleBoxClick(i, j);
            });
            
        }

        board.appendChild(row);
    }

    // highlight initial box 
    highlightBox(currentRow, currentCol);
}

initBoard() 

function highlightBox(row, col) {

    // remove previous highlight 
    removeHighlight() 

    // add highlight to current box 
    let boxes = document.querySelectorAll(".sudoku-box")
    let index = row * 9 + col; 
    boxes[index].classList.add("highlighted-box")
}

function removeHighlight() { 
    let highlightedBox = document.querySelector(".highlighted-box")
    if (highlightedBox) {
        highlightedBox.classList.remove("highlighted-box")
    }
}

function handleArrowKeys(e) { 
    switch(e.key) {
        case "ArrowLeft":
            currentCol = Math.max(0, currentCol-1); 
            break; 

        case "ArrowRight":
            currentCol = Math.min(8, currentCol + 1); 
            break; 

        case "ArrowUp":
            currentRow = Math.max(0, currentRow - 1); 
            break; 

        case "ArrowDown":
            currentRow = Math.min(8, currentRow + 1);
            break;
    }

    highlightBox(currentRow, currentCol);
}

function handleBoxClick(row, col) {
    currentRow = row;
    currentCol = col;
    highlightBox(row, col); 
}
function handleKeyboardInput(e) {
    let pressedKey = String(e.key);

    if (pressedKey === "Backspace") {
        deleteNumber()
        return
    }

    let found = pressedKey.match(/[1-9]/gi) 
    if (!found || found.length !== 1) {
        return 
    } else {
        insertNumber(pressedKey)
    }

}

function insertNumber(num) {
    let boxes = document.querySelectorAll(".sudoku-box"); 
    let index = currentRow * 9 + currentCol; 
    boxes[index].innerText = num; 
    boxes[index].classList.add("preFilled")
}

function deleteNumber() {
    let boxes = document.querySelectorAll(".sudoku-box"); 
    let index = currentRow * 9 + currentCol; 
    if (boxes[index].innerText) {
        boxes[index].innerText = ''; 
    }
    box.classList.remove("preFilled")
}

function clearBoard() {
    let boxes = document.querySelectorAll(".sudoku-box");
    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove("preFilled", "solved-box");
    });
}

function solveSudoku() {
    
    let boardState = getBoardState();

    if (sudokuSolver(boardState)) {
        displaySolvedSudoku(boardState);
    } else {
        console.log("No solution exists.");
    }

}

function displaySolvedSudoku(solvedBoard) {
    let boxes = document.querySelectorAll(".sudoku-box");

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let index = row * 9 + col;
            let box = boxes[index];

            // Display the solved number and add a class for styling
            box.innerText = solvedBoard[row][col];
            box.classList.add("solved-number");
            if (!box.classList.contains("preFilled")) {
                box.classList.add("solved-box");
            }

            // Remove the highlighted box class
            box.classList.remove("highlighted-box");
        }
    }
}


function getBoardState() {
    const boardState = [[], [], [], [], [], [], [], [], []]; 
    const boxes = document.querySelectorAll(".sudoku-box");

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let index = row*9 + col;
            let boxValue = parseInt(boxes[index].innerText);
            if (boxValue) {
                boardState[row].push(boxValue);
            } else
                boardState[row].push(0);
        }
    }

    return boardState;
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target 

    if (target.classList.contains("number-button")) {
        let key = Number(target.innerText);
        insertNumber(key);
    } else if (target.classList.contains("delete-button")){
        deleteNumber();
    } else {
        let id = String(target.id)
        if (id === "solve") {
            solveSudoku();
        } else if (id === "clear") {
            console.log("clearing...");
            clearBoard();
        }
    }

});

document.addEventListener("keydown", (e) => {
    handleArrowKeys(e); 
    handleKeyboardInput(e);
})
