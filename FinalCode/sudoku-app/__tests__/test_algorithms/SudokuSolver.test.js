const SudokuSolver = require("../../algorithms/sudokuSolver");
const SudokuGenerator = require("../../algorithms/sudokuGenerator");

describe("SudokuSolver", () => {
  let solver;
  let testGrid;

  beforeAll(() => {
    // generate a grid for testing
    const generator = new SudokuGenerator();
    generator.generateCompleteGrid();
    testGrid = generator.getGrid();
  });

  beforeEach(() => {
    // create a new solver instance with a copy of the test grid before each test
    solver = new SudokuSolver(JSON.parse(JSON.stringify(testGrid)));
  });

  describe("isValidPlacement", () => {
    let solver;
    // Static grid with a known setup
    const testGrid = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    beforeEach(() => {
      // initialise the solver with the static grid
      solver = new SudokuSolver(JSON.parse(JSON.stringify(testGrid)));
    });

    test("should return true for a valid placement", () => {
      // valid placement - empty cell and doesn't violate Sudoku rules
      expect(solver.isValidPlacement(2, [0, 2])).toBe(true);
    });

    test("should return false for an invalid row placement", () => {
      // invalid placement - violates the row constraint
      expect(solver.isValidPlacement(3, [0, 2])).toBe(false);
    });

    test("should return false for an invalid column placement", () => {
      // invalid placement - violates the column constraint
      expect(solver.isValidPlacement(6, [1, 2])).toBe(false);
    });

    test("should return false for an invalid box placement", () => {
      // invalid placement - violates the 3x3 box constraint
      expect(solver.isValidPlacement(5, [1, 2])).toBe(false);
    });
  });

  test("solveSudoku solves the puzzle correctly", () => {
    // remove numbers to create a solvable puzzle
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        solver.grid[i][j] = 0;
      }
    }

    expect(solver.solveSudoku()).toBe(true);
  });

  test("printGrid prints the grid without throwing errors", () => {
    const consoleSpy = jest.spyOn(console, "log");
    solver.printGrid("Test Grid");
    expect(consoleSpy).toHaveBeenCalled();
  });
});
