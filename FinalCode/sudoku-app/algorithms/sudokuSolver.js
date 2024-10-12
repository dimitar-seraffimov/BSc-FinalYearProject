// algorithm to use the fine-tuned backtracking algorithm to solve the Sudoku puzzle
const SudokuGenerator = require("./sudokuGenerator");

class SudokuSolver {
  constructor(grid) {
    this.grid = grid; // constructor to set the grid
  }

  // function to initialise dictionaries for position and remaining empty cells
  initialiseDictionaries() {
    let position = {}; // key: [row, col], value: 0 (empty cell indicator)
    let remaining = {}; // key: row or col, value: count of empty cells

    // iterating through the grid to fill the dictionaries
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] === 0) {
          position[[row, col]] = 0; // mark empty cell
          remaining[row] = (remaining[row] || 0) + 1; // increment empty cell count for that row
          remaining[col + 9] = (remaining[col + 9] || 0) + 1; // increment empty cell count for that col
        }
      }
    }
    return { position, remaining };
  }

  // function to check if the placement of a number is valid, following Sudoku constraints
  isValidPlacement(num, pos) {
    for (let i = 0; i < 9; i++) {
      // row and column check for conflicts
      if (this.grid[pos[0]][i] === num && pos[1] !== i) return false; // false if num already in row
      if (this.grid[i][pos[1]] === num && pos[0] !== i) return false; // false if num already in col
    }

    // box check for conflicts inside the 3x3 grid
    const boxStartRow = pos[0] - (pos[0] % 3);
    const boxStartCol = pos[1] - (pos[1] % 3);

    for (let row = boxStartRow; row < boxStartRow + 3; row++) {
      for (let col = boxStartCol; col < boxStartCol + 3; col++) {
        if (this.grid[row][col] === num && (row !== pos[0] || col !== pos[1]))
          return false; // false if num already in 3x3 box
      }
    }
    return true; // placement is valid if no conflicts found
  }

  // function attempting to solve the Sudoku puzzle using backtracking
  solveSudoku() {
    // initialise dictionaries for position and remaining empty cells
    const { position, remaining } = this.initialiseDictionaries();

    // sort positions by the sum of remaining empty cells in the row and column
    // prioritising the cell with the fewest remaining empty cells -- faster solution path
    const sortedPositions = Object.keys(position)
      .sort(
        (a, b) =>
          remaining[a[0]] +
          remaining[parseInt(a[1]) + 9] -
          (remaining[b[0]] + remaining[parseInt(b[1]) + 9])
      )
      .map((p) => p.split(",")); // convert the string keys back to array positions

    // recursive function to try and solve the grid
    const solve = (sortedPositions) => {
      if (!sortedPositions.length) {
        return true; // if all cells are filled, the grid == solved
      }
      // get next empty cell position
      const [row, col] = sortedPositions[0].map(Number);

      for (let num = 1; num <= 9; num++) {
        // try numbers 1-9
        if (this.isValidPlacement(num, [row, col])) {
          // if num is valid, place it
          this.grid[row][col] = num;
          if (solve(sortedPositions.slice(1))) {
            return true; // if this path leads to a solution, return true
          }
          this.grid[row][col] = 0; // otherwise, reset the cell and try next num
        }
      }
      return false; // if no valid numb for this cell, return false
    };

    return solve(sortedPositions);
  }

  // function to print the grid with optional custom message
  printGrid(message = "") {
    console.log(`${message}:`);
    for (let row = 0; row < 9; row++) {
      if (row % 3 === 0 && row !== 0) console.log("- - - - - - - - - - - -"); // row dividers
      let rowStr = "";
      for (let col = 0; col < 9; col++) {
        rowStr +=
          (col % 3 === 0 && col !== 0 ? " | " : "") + this.grid[row][col] + " "; // formatting the grid
      }
      console.log(rowStr.trim());
    }
    console.log("\n");
  }
}

module.exports = SudokuSolver;

// example
async function main() {
  const generator = new SudokuGenerator("Medium"); // adjust to test
  await generator.generateCompleteGrid();
  generator.printGrid("Fully Generated Grid");

  generator.removeNumbersFromGrid();
  generator.printGrid("The Sudoku grid to be solved");

  const puzzle = generator.getGrid();
  const solver = new SudokuSolver(puzzle);

  if (solver.solveSudoku()) {
    solver.printGrid("Solved Sudoku Grid");
  } else {
    // if no solution exists, print message
    console.log("No solution exists!");
  }
}

// this ensures that the main function is only called when the file is run directly
if (typeof module !== "undefined" && require.main === module) {
  main();
}
