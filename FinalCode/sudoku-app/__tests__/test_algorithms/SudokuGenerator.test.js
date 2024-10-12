const SudokuGenerator = require("../../algorithms/sudokuGenerator");

describe("SudokuGenerator", () => {
  let sudoku;

  beforeEach(() => {
    sudoku = new SudokuGenerator("Hard");
  });

  test("initialise a 9x9 grid", () => {
    expect(sudoku.grid.length).toBe(9);
    sudoku.grid.forEach((row) => {
      expect(row.length).toBe(9);
    });
  });

  test("initialise grid with all zeros", () => {
    expect(sudoku.grid.flat().every((value) => value === 0)).toBe(true);
  });

  test("generate a complete grid successfully", () => {
    sudoku.generateCompleteGrid();
    const nonZeroCount = sudoku.grid
      .flat()
      .filter((value) => value !== 0).length;
    expect(nonZeroCount).toBe(81); // complete grid should have no zeros
  });

  test("valid placement checks", () => {
    sudoku.grid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 0], // empty cell on [0, 8]
      [4, 5, 0, 7, 8, 9, 1, 2, 3], // empty cell on [1, 2]
      [0, 8, 9, 1, 2, 3, 4, 5, 6], // empty cell on [2, 0]

      [2, 1, 4, 3, 6, 0, 8, 9, 7], // empty cell on [3, 5]
      [3, 6, 5, 0, 9, 7, 2, 1, 4], // empty cell on [4, 3]
      [8, 9, 7, 2, 1, 4, 0, 6, 5], // empty cell on [5, 6]

      [5, 3, 1, 6, 4, 0, 9, 7, 8], // empty cell on [6, 5]
      [6, 4, 2, 9, 0, 8, 5, 3, 1], // empty cell on [7, 4]
      [9, 0, 8, 5, 3, 1, 6, 4, 2], // empty cell on [8, 1]
    ];

    // empty cell [0, 8]
    expect(sudoku.isValidPlacement(sudoku.grid, 9, [0, 8])).toBe(true);
    // empty cell [1, 2]
    expect(sudoku.isValidPlacement(sudoku.grid, 6, [1, 2])).toBe(true);
    // empty cell [2, 0]
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [2, 0])).toBe(true);
    // empty cell [3, 5]
    expect(sudoku.isValidPlacement(sudoku.grid, 5, [3, 5])).toBe(true);
    // empty cell [4, 3]
    expect(sudoku.isValidPlacement(sudoku.grid, 8, [4, 3])).toBe(true);
    // empty cell [5, 6]
    expect(sudoku.isValidPlacement(sudoku.grid, 3, [5, 6])).toBe(true);
    // empty cell [6, 5]
    expect(sudoku.isValidPlacement(sudoku.grid, 2, [6, 5])).toBe(true);
    // empty cell [7, 4]
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [7, 4])).toBe(true);
    // empty cell [8, 1]
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [8, 1])).toBe(true);
  });

  test("valid placement checks for conflicts in 3x3 subgrid", () => {
    sudoku.grid = [
      [1, 2, 3, 4, 5, 6, 7, 8, 0], // empty cell on [0, 8]
      [4, 5, 0, 7, 8, 9, 1, 2, 3], // empty cell on [1, 2]
      [7, 8, 9, 1, 0, 3, 4, 5, 6], // empty cell on [2, 4]

      [2, 1, 4, 3, 6, 0, 8, 9, 7], // empty cell on [3, 5]
      [3, 6, 0, 8, 9, 7, 2, 1, 4], // empty cell on [4, 2]
      [8, 9, 7, 2, 1, 4, 0, 6, 5], // empty cell on [5, 6]

      [5, 3, 1, 6, 4, 2, 9, 0, 8], // empty cell on [6, 7]
      [6, 4, 2, 9, 0, 8, 5, 3, 1], // empty cell on [7, 4]
      [9, 0, 8, 5, 3, 1, 6, 4, 2], // empty cell on [8, 1]
    ];

    // valid placements
    expect(sudoku.isValidPlacement(sudoku.grid, 9, [0, 8])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 6, [1, 2])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 2, [2, 4])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 5, [3, 5])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 5, [4, 2])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 3, [5, 6])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [6, 7])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [7, 4])).toBe(true);
    expect(sudoku.isValidPlacement(sudoku.grid, 7, [8, 1])).toBe(true);

    // invalid placements
    expect(sudoku.isValidPlacement(sudoku.grid, 1, [1, 2])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 4, [2, 4])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 3, [3, 5])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 8, [4, 2])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 1, [5, 6])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 6, [6, 7])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 9, [7, 4])).toBe(false);
    expect(sudoku.isValidPlacement(sudoku.grid, 5, [8, 1])).toBe(false);
  });

  test("test number of clues removed for the difficulty level", () => {
    sudoku.generateCompleteGrid();
    const initialNonEmptyCount = sudoku.getNonEmptySquares().length;
    sudoku.removeNumbersFromGrid();
    const afterRemovalNonEmptyCount = sudoku.getNonEmptySquares().length;
    // calculate the number of clues actually removed
    const cluesRemoved = initialNonEmptyCount - afterRemovalNonEmptyCount;
    // the actual numbers removed can vary within a range, use the minimum expected removals
    const minCluesToRemove = sudoku.difficultyLevels["Hard"];
    expect(cluesRemoved).toBeGreaterThanOrEqual(minCluesToRemove); // check that at least the minimum number of clues for the level are removed
  });

  test("has unique solution returns true for a valid puzzle", () => {
    sudoku.generateCompleteGrid();
    sudoku.removeNumbersFromGrid();
    expect(sudoku.hasUniqueSolution(sudoku.getGrid())).toBe(true);
  });

  test("hasUniqueSolution correctly identifies non-unique grid", () => {
    // below is a grid known to have multiple solutions
    sudoku.grid = [
      [2, 9, 5, 7, 4, 3, 8, 6, 1],
      [4, 3, 1, 8, 6, 5, 9, 0, 0], // two possible solutions for both cells = 2 or 7
      [8, 7, 6, 1, 9, 3, 5, 4, 3],

      [3, 8, 7, 4, 5, 9, 2, 1, 6],
      [6, 1, 2, 3, 8, 7, 4, 9, 5],
      [5, 4, 9, 2, 1, 6, 7, 3, 8],

      [7, 6, 3, 5, 3, 4, 1, 8, 9],
      [9, 2, 8, 6, 7, 1, 3, 5, 4],
      [1, 5, 4, 9, 3, 8, 6, 0, 0], // two possible solutions for both cells = 2 or 7
    ];
    expect(sudoku.hasUniqueSolution(sudoku.grid)).toBe(false);
  });

  test("hasUniqueSolution identifies unique and non-unique puzzles", () => {
    // puzzzle with unique solution
    const uniquePuzzle = [
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
    sudoku.grid = uniquePuzzle;
    expect(
      sudoku.hasUniqueSolution(JSON.parse(JSON.stringify(uniquePuzzle)))
    ).toBe(true);

    // puzzle configuration known to have multiple solutions or none
    const nonUniquePuzzle = [
      [2, 9, 5, 7, 4, 3, 8, 6, 1],
      [4, 3, 1, 8, 6, 5, 9, 0, 0], // two possible solutions for both cells = 2 or 7
      [8, 7, 6, 1, 9, 2, 5, 4, 3],

      [3, 8, 7, 4, 5, 9, 2, 1, 6],
      [6, 1, 2, 3, 8, 7, 4, 9, 5],
      [5, 4, 9, 2, 1, 6, 7, 3, 8],

      [7, 6, 3, 5, 3, 4, 1, 8, 9],
      [9, 2, 8, 6, 7, 1, 3, 5, 4],
      [1, 5, 4, 9, 3, 8, 6, 0, 0], // two possible solutions for both cells = 2 or 7
    ];
    sudoku.grid = nonUniquePuzzle;
    expect(
      sudoku.hasUniqueSolution(JSON.parse(JSON.stringify(nonUniquePuzzle)))
    ).toBe(false);
  });
});
