import random
import copy

class SudokuGenerator: 
  # initialising the grid to an empty 9x9 grid
  def __init__(self, level='Easy'):
    self.grid = [[0 for i in range(9)] for j in range(9)]
    self.level = level
    self.difficulty_levels = {
        'Easy': random.randint(31, 35),
        'Medium': random.randint(35, 39),
        'Hard': random.randint(39, 43),
        'Expert': random.randint(46, 50)
    }
  
  # reusable method to reinitialise an empty state of the grid
  def initialise_grid(self):
    self.grid = [[0 for i in range(9)] for j in range(9)]

  # method to fill the grid with a complete solution
  def is_valid_placement(self, grid, num, pos):
    # check row for the presence of the same number
    for i in range(9):
      if grid[pos[0]][i] == num and pos[1] != i:
        return False

    # check column for the presence of the same number
    for i in range(9):
      if grid[i][pos[1]] == num and pos[0] != i:
        return False
    
    # calculate subgrid start points
    box_start_row = pos[0] - pos[0] % 3
    box_start_col = pos[1] - pos[1] % 3

    # check 3x3 subgrid for the presence of the same number
    for i in range(box_start_row, box_start_row + 3):
      for j in range(box_start_col, box_start_col + 3):
        if grid[i][j] == num and (i, j) != pos:
          return False
    
    # num is not present in the row, column or subgrid = valid placement
    return True 
  
  # recursive function to randomly fill the grid
  def recursive_fill_grid(self, grid=None):
    if grid is None:
      grid = self.grid
    for i in range(9):
      for j in range(9):
        if grid[i][j] == 0:
          
          numbers = list(range(1,10)) # shuffles the numbers before trying them
          random.shuffle(numbers)
          for num in numbers:
            if self.is_valid_placement(grid, num, (i,j)): # attempts to place the number
              grid[i][j] = num
              if self.recursive_fill_grid(grid):
                return True
              grid[i][j] = 0
          return False
    return True
  
  # method to generate a complete grid
  def generate_complete_grid(self):
    self.initialise_grid()
    if not self.recursive_fill_grid():
      raise Exception('Failed to generate a complete Sudoku grid')
    
  # gets the coordinates of the non-empty squares
  def get_non_empty_squares(self):
    return [(row, col) for row in range(9) for col in range(9) if self.grid[row][col] != 0]

  # method to remove numbers from the grid to create the puzzle
  def remove_numbers_from_grid(self):
    grid = self.grid
    target_removed = self.difficulty_levels.get(self.level, 36) # default to easy level
    removed_squares = 0

    while removed_squares < target_removed:
      row, col = random.randint(0,8), random.randint(0,8)
      if grid[row][col] != 0:
        backup = grid[row][col]
        grid [row][col] = 0
        if not self.has_unique_solution(copy.deepcopy(grid)):
          grid[row][col] = backup # restore if the solution is not unique
        else:
          removed_squares += 1

    print(f"Removed {removed_squares} squares for a {self.level} puzzle.")


  # method to check if the puzzle has a unique solution
  def has_unique_solution(self, grid):
    solutions = [0]
    
    def solve(grid, non_empty_squares=None):
      if non_empty_squares is None:
        non_empty_squares = self.get_non_empty_squares()
            
      if not non_empty_squares:  # if there are no more non-empty squares, a solution has been found
        solutions[0] += 1
        return solutions[0] <= 1  # return False immediately if more than one solution is found
        
      for num in range(1, 10):
        row, col = non_empty_squares[0]  # work on the first non-empty square
        if self.is_valid_placement(grid, num, (row, col)):
          grid[row][col] = num  # try this number
          if solve(grid, non_empty_squares[1:]):  # move to the next square
            return True  # found a valid solution, stop the recursion
          grid[row][col] = 0  # reset the square if the number doesn't lead to a solution
  
      return False  # no valid number was found for the current square, backtrack
    
    solve(grid)
    return solutions[0] == 1
  
  # function to print the grid in the command line
  def print_grid(self, message="Grid"):
    print(f"{message}:")
    for row in range(9):
      if row % 3 == 0 and row != 0:
        print("- - - - - - - - - - - -")
      for col in range(9):
        if col % 3 == 0 and col != 0:
          print(" | ", end="")
        if col == 8:
          print(self.grid[row][col])
        else:
          print(str(self.grid[row][col]) + " ", end="")
    print("\n")

  # returns a copy of the grid to be used in solver.py
  def get_grid(self):
    return copy.deepcopy(self.grid)

def main():
  sudoku = SudokuGenerator(level="Hard")
  sudoku.generate_complete_grid()
  sudoku.print_grid(message = "Fully Generated Grid")
  
  sudoku.remove_numbers_from_grid()
  sudoku.print_grid(message = "Puzzle Grid")

  if sudoku.has_unique_solution(copy.deepcopy(sudoku.grid)):
    print("A unique solution exists.\n")
  else:
    print("No unique solution exists.")

if __name__ == "__main__": 
  main()
