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

    countdown = setInterval(function() {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(countdown);
            alert('Time\'s up! Game over.');
        } else {
            updateTimer();
        }
    }, 1000);
}
const cells = document.querySelectorAll(".cell")

cells.forEach(cell => {
    cell.addEventListener('input', () => {
        const value = Number(cell.innerText);
        if (Number.isNaN(value) || value < 1 || value > 9) {
            cell.innerText = '';
        }
    });
});




// start function

let isGame = 0;
let board 
const gridCells = document.querySelectorAll('.cell');
console.log(gridCells);

// Define an empty 9x9 grid
const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Function to check if a number is valid at a given position
function isValid(board, row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// function for submit

// function submit(){

//     let flag = 1;
//     // checking all rows
//     for (let i = 0 ; i < 9 ;i++){
//         // checking row i 

//         for(let j = 0 ; j < 9 ; j++){
//             // checking element j of row i 

//             for(let k = 0 ; k < 9 ; k++){

                
//             }
            
//         }
//     }


// }

// function for answer 

function answer(){

    dfs(board, 9);
}



  function dfs(board, n) {
    // for every cell in the sudoku
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        // if its empty
        if (board[row][col] !== '.') continue;
        // try every number 1-9
        for (let i = 1; i <= 9; i++) {
          const c = i;
          // if that number is valid
          if (isValid(board, row, col, c)) {
            board[row][col] = c;
            // continue search for that board, ret true if solution is reached
            if (dfs(board, n)) return true;
          }
        }
        // solution wasnt found for any num 1-9 here, must be a dead end...
        // set the current cell back to empty
        board[row][col] = '.';
        // ret false to signal dead end 
        return false;
      }
    }
    // all cells filled, must be a solution
    return true;
  }
  
// Backtracking solver
// Function to initialize and solve the puzzle
function startSolver() {
    const level = document.querySelector('input[name="level"]:checked').value;
    const puzzle = generatePuzzle(level);
    const gridCells = document.querySelectorAll('.sudoku-grid .cell');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const index = row * 9 + col;
            if (puzzle[row][col] !== 0) {
                gridCells[index].textContent = puzzle[row][col];
            } else {
                gridCells[index].textContent = '';
            }
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
function resetGrid() {
    const gridCells = document.querySelectorAll('.sudoku-grid .cell');
    gridCells.forEach(cell => {
        cell.textContent = '';
    });
}
