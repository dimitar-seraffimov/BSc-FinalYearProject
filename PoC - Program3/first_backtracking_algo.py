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


# function to solve the Sudoku grid

def solve(grid):
    
    # when not commented, the following lines will print the state of the grid after each step of the algorithm

    # print("Solving the Sudoku puzzle...") 
    # print("The current state of the grid:")
    # print_grid(grid) # prints the current state of the grid

    find = find_empty(grid) # find the first empty cell in the grid
    if not find: 
        return True # if there are no empty cells, the grid is solved
    else:
        row, col = find # get the row and column of the empty cell

    for i in range(1, 10): # iterate through the numbers from 1 to 9
        if valid(grid, i, (row, col)): # check if the number is valid
            grid[row][col] = i # if the number is valid, insert it in the empty cell

            if solve(grid): 
                return True # recursively call the function to solve the grid

            grid[row][col] = 0 # if the number is not valid, reset the cell value to 0

    return False

# function to check if the number inserted is valid

def valid(grid, num, pos):
    # checking the row
    for i in range(len(grid[0])): # iterate through every column of the given row
        if grid[pos[0]][i] == num and pos[1] != i: # checking if the current number inserted is already present in the row
            return False

    # checking the column
    for i in range(len(grid)): # iterate through every row of the given column
        if grid[i][pos[1]] == num and pos[0] != i: # checking if the current number inserted is already present in the column
            return False

    # checking the 3x3 box, in which the number is inserted
    box_x = pos[1] // 3 # integer division by 3 -> this gives the x position of the 3x3 box
    box_y = pos[0] // 3 # integer division by 3 -> this gives the y position of the 3x3 box

    for i in range(box_y * 3, box_y * 3 + 3): # iterate through the rows of the box
        for j in range(box_x * 3, box_x * 3 + 3): # iterate through the columns of the box
            if grid[i][j] == num and (i, j) != pos: # checking if the current number inserted is already present in the box
                return False

    return True

# function to print the grid

def print_grid(grid): 
    for i in range(len(grid)):
        if i % 3 == 0 and i != 0:
            print("- - -    - - -    - - -") # prints horizontal lines, dividing the grid into 3x3 boxes
        for j in range(len(grid[0])): 
            if j % 3 == 0 and j != 0: # if the cell is not the first one in the row =>
                print(" | ", end="") # prints vertical lines, dividing the grid into 3x3 boxes

            if j == 8: # if the cell is the last one in the row =>
                print(grid[i][j]) # prints the number in the cell
            else:
                print(str(grid[i][j]) + " ", end="") # prints the number in the cell, followed by a space

# function to find the first empty cell in the grid

def find_empty(grid): # returns the position of the first empty cell
    for i in range(len(grid)): # iterate through the rows
        for j in range(len(grid[0])): # iterate through the columns
            if grid[i][j] == 0: # if the cell is empty =>
                return (i, j) # returns the position of the cell = row, column

    return None # if there are no empty cells => returns None

print("The original Sudoku grid:")
print_grid(grid) # prints the grid before solving it

solve(grid) # solves the grid
print("\n")

print("The solved Sudoku puzzle:")
print_grid(grid) # prints the solved Sudoky grid