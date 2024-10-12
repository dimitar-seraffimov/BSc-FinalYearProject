numQueens = 8  # number of queens the algorithm is solving the problem for

# initialize a list with zeros to store the current state of the board
currentSolution = [0 for x in range(numQueens)]
solutions = []  # list to store all the valid solutions


def isSafe(testRow, testCol):
    # function to check if it's safe to place a queen at the given row and column
    if testRow == 0:  # base case: always safe to place a queen in the first row
        return True

    for row in range(0, testRow):
        # iterate through all previously placed queens to check for conflicts
        # check for another queen in the same column
        if testCol == currentSolution[row]:
            return False
        # check for another queen on the same diagonal
        if abs(testRow - row) == abs(testCol - currentSolution[row]):
            return False
    return True  # if no conflicts, it's safe to place the queen


def placeQueen(row):
    # recursive function to place queens on the board
    global currentSolution, solutions, numQueens  # use global variables

    for col in range(numQueens):
        # try placing a queen in each column of the current row
        if not isSafe(row, col):  # check if it's safe to place the queen
            continue  # if not, skip to the next column
        else:
            currentSolution[row] = col  # place the queen
            if row == numQueens - 1:  # if all queens are placed
                # add the solution to the list
                solutions.append(currentSolution.copy())
            else:
                placeQueen(row + 1)  # recursively try to place the next queen


placeQueen(0)  # start the algorithm


print("Found " + str(len(solutions)) + " solutions for the " + str(numQueens) +
      " queens problem.")  # print the number of solutions found for the given number of queens

# alternative way to print the number of solutions found
print(len(solutions), "solutions found")
for solution in solutions:
    print(solution)  # print each solution
