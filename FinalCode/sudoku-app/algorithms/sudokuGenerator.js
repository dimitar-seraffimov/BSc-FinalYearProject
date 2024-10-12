// algorithm to generate a Sudoku puzzle:
// - based on a chosen difficulty level
// - checking if the generated puzzle has one unique solution
class SudokuGenerator {
  // set default level to "Easy"
  constructor(level = "Easy") {
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(0)); // 9x9 grid with 0s
    this.level = level; // set the level
    this.difficultyLevels = {
      // different difficulty levels with number of removed clues for each level
      Easy: 40 + Math.floor(Math.random() * 4), // 40 to 43, Easy level
      Medium: 44 + Math.floor(Math.random() * 4), // 44 to 47, Medium level
      Hard: 48 + Math.floor(Math.random() * 4), // 48 to 51, Hard level
      Expert: 52 + Math.floor(Math.random() * 4), // 52 to 55, Expert level
    };
  }

  initialiseGrid() {
    // create a 9x9 grid with 0s
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  // function to check if the placement of a number is valid, Sudoku rules
  isValidPlacement(grid, num, pos) {
    // check if the number is already in the row or column
    for (let i = 0; i < 9; i++) {
      if (grid[pos[0]][i] === num && pos[1] !== i) {
        return false;
      }
      if (grid[i][pos[1]] === num && pos[0] !== i) {
        return false;
      }
    }

    // check if the number is already in the 3x3 box
    const boxStartRow = pos[0] - (pos[0] % 3);
    const boxStartCol = pos[1] - (pos[1] % 3);

    // iterate through the 3x3 box
    for (let i = boxStartRow; i < boxStartRow + 3; i++) {
      for (let j = boxStartCol; j < boxStartCol + 3; j++) {
        if (grid[i][j] === num && (i !== pos[0] || j !== pos[1])) {
          return false;
        }
      }
    }

    return true; // valid placement
  }

  // function to fill the grid with numbers
  recursiveFillGrid(grid = this.grid) {
    // iterate through the grid to fill the empty cells
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
          this.shuffleArray(numbers); // shuffle numbers for new random puzzle
          for (let num of numbers) {
            if (this.isValidPlacement(grid, num, [i, j])) {
              grid[i][j] = num;
              if (this.recursiveFillGrid(grid)) {
                return true;
              }
              grid[i][j] = 0;
            }
          }
          return false; // no valid number for this cell
        }
      }
    }
    return true; // grid is filled
  }

  // wrapper function to generate a complete grid
  generateCompleteGrid() {
    this.initialiseGrid(); // initialise the grid
    if (!this.recursiveFillGrid()) {
      throw new Error("Failed to generate a complete Sudoku grid");
    }
  }

  // function to get the non-empty squares for solution uniqueness check
  getNonEmptySquares() {
    const nonEmptySquares = []; // array to store non-empty squares
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.grid[row][col] !== 0) {
          nonEmptySquares.push([row, col]);
        }
      }
    }
    return nonEmptySquares;
  }

  // function to remove numbers from the grid, creating a unique puzzle
  removeNumbersFromGrid() {
    // numbers to remove based on selected difficulty level
    const removalsBasedOnLevel = this.difficultyLevels[this.level];
    let numbersRemoved = 0;

    // remove numbers until the target based on the level is reached
    while (numbersRemoved < removalsBasedOnLevel) {
      // select a random row and column
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      // check if cell is empty
      if (this.grid[row][col] !== 0) {
        // creates a backup of the current grid state before removing a number
        const backupGrid = JSON.parse(JSON.stringify(this.grid));
        this.grid[row][col] = 0; // attempt to remove a number

        // check if current grid config has unique solution
        if (!this.hasUniqueSolution(JSON.parse(JSON.stringify(this.grid)))) {
          this.grid = backupGrid; // restore if uniqueness is compromised
        } else {
          // add to counter, number successfully removed
          numbersRemoved++;
        }
      }
    }
  }

  // function to check if the generated puzzle after removing numbers has unique solution
  hasUniqueSolution(grid) {
    let solutions = 0; //  counter for solutions

    // recursive function to solve the puzzle
    const solve = (grid, currentPos = 0) => {
      // stop if more than one solution is found
      if (solutions > 1) return;
      // base case: if all cells are processed and a solution is found
      if (currentPos === 81) {
        solutions++;
        return;
      }

      // calculate current row and column based on the current position
      const row = Math.floor(currentPos / 9);
      const col = currentPos % 9;

      // move to the next cell if current cell is not empty
      if (grid[row][col] !== 0) {
        solve(grid, currentPos + 1);
        return;
      }
      // try placing numbers 1-9 in the current empty cell
      for (let num = 1; num <= 9 && solutions <= 1; num++) {
        // stop trying numbers if solution is found
        if (this.isValidPlacement(grid, num, [row, col])) {
          grid[row][col] = num; // place num in the grid
          solve(grid, currentPos + 1); // move to solve the next cell
          grid[row][col] = 0; // backtrack by removing the number if it doesn't lead to a solution
        }
      }
    };
    // create a deep copy of the grid to solve without changing original grid
    solve(JSON.parse(JSON.stringify(grid)));
    // true if only one solution is found
    return solutions === 1;
  }

  // print the grid
  printGrid(message = "Grid") {
    console.log(`${message}:`);
    for (let row = 0; row < 9; row++) {
      if (row % 3 === 0 && row !== 0) {
        console.log("- - - - - - - - - - - -");
      }
      let rowString = "";
      for (let col = 0; col < 9; col++) {
        rowString +=
          (col % 3 === 0 && col !== 0 ? " | " : "") + this.grid[row][col] + " ";
      }
      console.log(rowString.trim());
    }
    console.log("\n");
  }

  getGrid() {
    return JSON.parse(JSON.stringify(this.grid));
  }

  // function to shuffle numbers for the number placement
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

module.exports = SudokuGenerator;

async function main() {
  const sudoku = new SudokuGenerator("Hard"); // adjust to test
  sudoku.generateCompleteGrid();
  sudoku.printGrid("Fully Generated Grid");

  sudoku.removeNumbersFromGrid();
  sudoku.printGrid("Puzzle Grid");

  if (sudoku.hasUniqueSolution(JSON.parse(JSON.stringify(sudoku.grid)))) {
    console.log("A unique solution exists.\n");
  } else {
    console.log("No unique solution exists.");
  }
}

// this ensures that the main function is only called when the file is run directly
if (typeof module !== "undefined" && require.main === module) {
  main();
}
