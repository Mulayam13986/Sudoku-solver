let countdown;
let interval;
let remainingTime = 0;

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
}

function startGame() {
    const intervalSelect = document.getElementById('interval');
    interval = parseInt(intervalSelect.value, 10) * 60;

    remainingTime = interval;
    updateTimer();

    countdown = setInterval(function () {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(countdown);
            alert('Time\'s up! Game over.');
        } else {
            updateTimer();
        }
    }, 1000);
}


// start function

let isGame = 0;

const gridCells = document.querySelectorAll('.cell');
// console.log(gridCells);

// initialising board 
let board = [];
for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
        row.push(0);
    }
    board.push(row);
}

let count = 0;

const cells = document.querySelectorAll(".cell");
for (let cell of gridCells) {

    // console.log(cell.innerText);

    let i = parseInt(count / 9);
    // console.log(count/9);
    let j = count % 9;
    count += 1;
    board[i][j] = cell.innerText;

}

cells.forEach(cell => {
    cell.addEventListener('input', () => {
        const value = Number(cell.innerText);
        if (Number.isNaN(value) || value < 1 || value > 9) {
            cell.innerText = "";
        }
        else {
        let id_cell = parseInt(cell.getAttribute("id"));
        console.log(id_cell);
        let i = parseInt(id_cell / 9);
        let j = id_cell % 9;
        board[i][j] = value;
        }
        
    });
});

function boardConstruction(gridCells) {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0);
        }
        board.push(row);
    }


    let count = 0;
    for (let cell of gridCells) {

        // console.log(cell.innerText);

        let i = parseInt(count / 9);
        // console.log(count/9);
        let j = count % 9;
        count += 1;
        board[i][j] = cell.innerText;

    }

    return board ;

}


// function which will give alert when user submits the puzzle if its true or false;

function submit() {

    
    let rows = new Set();
    let cols = new Set();
    let boxes = new Set();
    let curRowElem;
    let curColElem;
    let curBoxElem;

    for (let i = 0; i < board.length; i += 1) {
        for (let j = 0; j < board[0].length; j += 1) {
            curRowElem = board[i][j]
            curColElem = board[j][i]
            curBoxElem = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][((i * 3) % 9) + (j % 3)]

            if (curRowElem == "" || curColElem == "" || curColElem == "") {
                document.getElementById("result").innerHTML = `<h2 class="text-danger" id="result">Better Luck Next Time </h2>`
                return false;
            }
            if (rows.has(curRowElem) || cols.has(curColElem) || (boxes.has(curBoxElem))) {
                document.getElementById("result").innerHTML = `<h2 class="text-danger" id="result">Better Luck Next Time </h2>`
                return false;
            }
            rows.add(curRowElem);
            cols.add(curColElem);
            boxes.add(curBoxElem);
        }

        rows.clear()
        cols.clear()
        boxes.clear()
    }
    document.getElementById("result").innerHTML = `<h2 class="text-success" id="result">You have successfully solved the sudoku</h2>`
    return true;
}

// Function to check if a number is valid at a given position
function isValid(board, row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == String(num) || board[i][col] == String(num)) {
            return false;
        }
    }

    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] == String(num)) {
                return false;
            }
        }
    }

    return true;
}

function answer() {
    console.log(board);
    if (dfs(board, 9)) {
        console.log("solution is possible");
    }
    else {
        console.log("solution not possible");
    }
    fillValues(board);
}



function dfs(board, n) {
    // for every cell in the sudoku
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // if its empty
            if (board[row][col] !== "") continue;
            // try every number 1-9
            for (let i = 1; i <= 9; i++) {
                const c = i;
                // if that number is valid
                if (isValid(board, row, col, c)) {
                    board[row][col] = String(c);
                    // continue search for that board, ret true if solution is reached
                    if (dfs(board, n)) {
                        return true;
                    }
                    else {
                        board[row][col] = "";
                    }
                }
            }
            // solution wasnt found for any num 1-9 here, must be a dead end...

            // ret false to signal dead end 
            return false;
        }
    }
    // all cells filled, must be a solution
    return true;
}

function fillValues() {

    for (let i = 0; i < 9; i++) {

        for (let j = 0; j < 9; j++) {

            let id_cell = String(9 * i + j);

            document.getElementById(id_cell).innerText = board[i][j];
        }
    }
}


// Function to generate a Sudoku puzzle of a specified level
function generatePuzzle(level) {
    // Implement your puzzle generation logic here
    // You can create an empty grid and fill some cells based on the level
    return emptyGrid;
}

// Function to clear the grid
function restart() {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = '';
        }
    }
    fillValues(board);
}


// generate board : 

function generate(){


}