# example Sudoku grid to be solved
# defined as a 2D list, with 0s representing empty cells

# Sudoku example number 1:
grid = [
    [5, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 3, 0, 1, 0, 4, 0],
    [0, 0, 8, 0, 7, 0, 9, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 7, 0, 9, 0, 6, 0, 0],
    [0, 7, 0, 0, 0, 8, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 3]
]

# Sudoku example number 2:
# grid = [
#     [0, 9, 0, 0, 3, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 8, 0, 4],
#     [0, 0, 0, 0, 0, 0, 0, 7, 0],
#     [0, 2, 0, 8, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 5, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 4, 0, 9, 0],
#     [0, 0, 7, 0, 0, 0, 0, 0, 0],
#     [8, 0, 6, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 7, 0, 0, 0, 4, 0]
# ]


# Sudoku example number 3 -> the hardest Sudoku example:
# grid = [
#     [0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 2, 7, 0, 0, 0, 4, 0, 0],
#     [0, 0, 0, 6, 0, 0, 0, 1, 0],
#     [5, 0, 0, 0, 0, 4, 0, 0, 8],
#     [0, 0, 4, 0, 0, 0, 2, 0, 0],
#     [7, 0, 0, 3, 0, 0, 0, 0, 5],
#     [0, 4, 0, 0, 0, 8, 0, 0, 0],
#     [0, 0, 3, 0, 0, 0, 8, 5, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0]
# ]



## function to initialize dictionaries
def initialize_dictionaries(grid):
    
    # dictionary, designed to keep track of the coordinates (row and column) of all empty cells
    position = {}   # key: (row, column), value: 0 (empty cell indicator)

    # dictionary, designed to keep count of the number of empty cells in each row and column
    remaining = {}  # key: row or column, value: count of empty cells

    # initialises the dictionaries to track empty cells and their count in rows/columns
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:      # if the cell is empty, (denoted by 0) => 
                position[(row, col)] = 0       # marks the position of the empty cell in the 'position' dictionary
                remaining[row] = remaining.get(row, 0) + 1    # increments the count of empty cells in the row in the 'remaining' dictionary
                
                # increments the count of empty cells in the column in the 'remaining' dictionary
                remaining[col + 9] = remaining.get(col + 9, 0) + 1    # columns are indexed from 9 to 17 to differentiate them from row indices (0-8)
                
    return position, remaining

position, remaining = initialize_dictionaries(grid)   


# sorts empty cell positions to prioritize those in rows or columns with fewer empty cells
# helps in prioritizing cells that are in rows or columns with fewer empty cells

sorted_positions = sorted(position.keys(), key=lambda x: remaining[x[0]] + remaining[x[1] + 9])

## function to print the grid

def print_grid(grid):
    for row in range(len(grid)):
        if row % 3 == 0 and row != 0:
            print("- - -    - - -    - - -") # prints horizontal lines, dividing the grid into 3x3 boxes
        for column in range(len(grid[0])): 
            if column % 3 == 0 and column != 0: # if the cell is not the first one in the row =>
                print(" | ", end="") # prints vertical lines, dividing the grid into 3x3 boxes

            if column == 8: # if the cell is the last one in the row =>
                print(grid[row][column]) # prints the number in the cell
            else:
                print(str(grid[row][column]) + " ", end="") # prints the number in the cell, followed by a space

## checks if the number inserted is valid

def valid(grid, num, pos):
    # checks the row
    for row in range(len(grid[0])): # iterates through every column of the given row
        if grid[pos[0]][row] == num and pos[1] != row: # checks if the current number inserted is already present in the row
            return False

    # checks the column
    for row in range(len(grid)): # iterates through every row of the given column
        if grid[row][pos[1]] == num and pos[0] != row: # checks if the current number inserted is already present in the column
            return False

    # checks the 3x3 box, in which the number is inserted
    box_x = pos[1] // 3 # integer division by 3 -> this gives the x position of the 3x3 box
    box_y = pos[0] // 3 # integer division by 3 -> this gives the y position of the 3x3 box

    for row in range(box_y * 3, box_y * 3 + 3): # iterates through the rows of the box
        for column in range(box_x * 3, box_x * 3 + 3): # iterates through the columns of the box
            if grid[row][column] == num and (row, column) != pos: # checks if the current number inserted is already present in the box
                return False

    return True

## function to solve the sudoku

def solve_sudoku(grid, sorted_positions):
    
    # the base case for recursion: if there are no more empty positions to fill, the puzzle is solved
    if not sorted_positions: 
        return True

    # gets the coordinates (row, column) of the first empty position from the sorted list
    row, col = sorted_positions[0]

    # iterates through all possible numbers (1 to 9) to find a valid number for the current position
    for num in range(1, 10):
        # checks if the current number is valid for the current position
        if valid(grid, num, (row, col)): 
            grid[row][col] = num    # if the number is valid, insert it in the empty cell

            # recursively call the function to solve the grid
            if solve_sudoku(grid, sorted_positions[1:]):
                return True # if the puzzle can be solved with the current placements of numbers, returns True

            # if the puzzle can not be solved with the number in the current position, bacjtrack to the previous position and try the next number in the loop
            grid[row][col] = 0

    # if none of the numbers can be inserted in the current position, the puzzle can not be solved
    return False


print("The Sudoku grid to be solved:")
print_grid(grid)
print("\n")

if solve_sudoku(grid, sorted_positions):
    print("Sudoku solved:")
    print_grid(grid)
else:
    print("No solution exists")
