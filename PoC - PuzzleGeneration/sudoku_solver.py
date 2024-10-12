import copy
from sudoku_generator import SudokuGenerator

class SudokuSolver:
  def __init__(self, grid):
    self.grid = grid
  
  # function to initialise dictionaries
  def initialise_dictionaries(self):
    # designed to keep track of the coordinates (row and column) of all empty cells
    position = {}   # key: (row, column), value: 0 (empty cell indicator)
    # designed to keep count of the number of empty cells in each row and column
    remaining = {}  # key: row or column, value: count of empty cells

    # initialise the dictionaries to track empty cells and their count in rows/columns
    for row in range(9):
      for col in range(9):
        if self.grid[row][col] == 0: # if the cell is empty, (denoted by 0) => 
          position[(row, col)] = 0    # mark the position of the empty cell in the 'position' dictionary
          remaining[row] = remaining.get(row, 0) + 1  # increment the count of empty cells in the row in the 'remaining' dictionary
          
          # increment the count of empty cells in the column in the 'remaining' dictionary
          remaining[col + 9] = remaining.get(col + 9, 0) + 1  # columns indexed from 9 to 17 to differentiate them from row indices (0-8)         
    return position, remaining


  # check if the number inserted is valid
  def is_valid_placement(self, num, pos):

    # check row, iterate through every column of the given row
    for row in range(9):
      if self.grid[pos[0]][row] == num and pos[1] != row: # check if the current inserted num is present in the row
        return False

    # check column, iterate through every row of the given column
    for row in range(9):
      if self.grid[row][pos[1]] == num and pos[0] != row: # check if the current inserted num is present in the column
        return False

    # check the 3x3 box, in which the number is inserted
    box_x = pos[1] // 3 # integer division by 3 -> gives the x position of the 3x3 box
    box_y = pos[0] // 3 # integer division by 3 -> gives the y position of the 3x3 box

    for row in range(box_y * 3, box_y * 3 + 3): # iterate through the rows of the box
      for column in range(box_x * 3, box_x * 3 + 3): # iterate through the columns of the box
        if self.grid[row][column] == num and (row, column) != pos: # check if the current inserted num is present in the box
          return False
    return True

  # function to solve the sudoku
  def solve_sudoku(self):
    
    position, remaining = self.initialise_dictionaries()   
    # sorts empty cell positions to prioritise those in rows or columns with fewer empty cells
    # it helps in prioritising cells in rows or columns with fewer empty cells
    sorted_positions = sorted(position.keys(), key=lambda x: remaining[x[0]] + remaining[x[1] + 9])
      
    def solve(sorted_positions):
      # the base case for recursion: if there are no more empty positions to fill, the puzzle is solved
      if not sorted_positions: 
        return True
      # gets the coordinates (row, column) of the first empty position from the sorted list
      row, col = sorted_positions[0]

      # iterate through all possible numbers (1 to 9) to find a valid number for the current position
      for num in range(1, 10):
        # check if the current number is valid for the current position
        if self.is_valid_placement(num, (row, col)): 

          # if the number is valid, insert it in the empty cell
          self.grid[row][col] = num 

          # recursively call the function to solve the grid
          if solve(sorted_positions[1:]):
            # return True, if the puzzle can be solved with the current num placements, else backtrack
            return True
          
          # if the puzzle can not be solved with the number in the current position
          # => bacjtrack to the previous position and try the next number in the loop

          self.grid[row][col] = 0

      # if no number can be placed in the current position, return False
      return False
      
    # call the solve function to solve the sudoku
    return solve(sorted_positions)


  # function to print the grid in the command line
  def print_grid(self, message=""):
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

def main():
  generator = SudokuGenerator(level="Medium")  # adjust to test
  generator.generate_complete_grid() 
  generator.print_grid(message = "Fully Generated Grid")

  generator.remove_numbers_from_grid()
  generator.print_grid(message = "The Sudoku grid to be solved")

  puzzle = generator.get_grid() 
  solver = SudokuSolver(puzzle)

  if solver.solve_sudoku():
      solver.print_grid(message="Solved Sudoku Grid")
  else:
      print("No solution exists!")

if __name__ == "__main__":
  main()