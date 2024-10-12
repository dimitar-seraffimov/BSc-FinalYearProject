import unittest
from sudoku_generator import SudokuGenerator 

class TestSudokuGenerator(unittest.TestCase):

    def test_initialise_grid(self):
        sudoku = SudokuGenerator()
        sudoku.initialise_grid()
        self.assertEqual(len(sudoku.grid), 9)
        self.assertTrue(all(len(row) == 9 for row in sudoku.grid))
        self.assertTrue(all(cell == 0 for row in sudoku.grid for cell in row)) 

    def test_is_valid_placement(self):
        sudoku = SudokuGenerator()
        sudoku.grid = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ]
        self.assertTrue(sudoku.is_valid_placement(sudoku.grid, 2, (0, 2)))  # valid placement
        self.assertFalse(sudoku.is_valid_placement(sudoku.grid, 3, (0, 2)))  # invalid placement

    def test_generate_complete_grid(self):
        sudoku = SudokuGenerator()
        sudoku.generate_complete_grid()
        self.assertTrue(all(all(cell != 0 for cell in row) for row in sudoku.grid))  # all cells should be filled
        # tests just that the grid is fully filled
        # it doesn't check if the grid is a valid solution

if __name__ == '__main__':
    unittest.main()
