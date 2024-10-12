Directory Structure Documentation

Project Directory: PROJECT\FinalCode\sudoku-app

1. Overview:
   This directory contains all the necessary files and subdirectories for the developed Sudoku application. The structure is modularly organised to separate folders in testing, components, hooks, utilities, styles and etc, in order to keep the codebase maintainable and scalable.

   I have uploaded the Android application on the Expo Dev server and this is the link to download the APK:
   https://expo.dev/artifacts/eas/2Nr9pawmLtQdvR3KYBiPUK.apk
   
   For more information on how to run the application, please refer to the README.md file in the root directory of the project.

2. Main Folder and Files:
   **tests** - contains all test files for the application.

   algorithms
   sudokuGenerator.js - the Sudoku grid generation logic
   sudokuSolver.js - the Sudoku solving logic

   assets\images
   appIcon.png - the icon image for the app
   homeScreen.png - background image for the home screen

   components
   inGameGrid
   numberPad.js - component for the number pad in the game grid
   sudokuCells.js - component for individual Sudoku cells
   sudokuGridLogic.js - manages the logic integration for the Sudoku grid
   popupMessages
   confirmationPopup.js - pop-up component for confirmations
   customPopContinue.js - pop-up component for custom messages

   hooks
   inGameHooks - hooks related to in-game features such as step back, grid reset and puzzle validation
   useGamesArchive - hooks for managing the game archiving
   useInputHistory - hooks for managing user input history
   useResumeGame - hooks for game resumption functionality
   useTimeTrackHooks - hooks for tracking play time

   screens
   gameScreen.js
   historyScreen.js
   homeScreen.js
   instructionsScreen.js

   styles
   CSS styles for the different components and screens

   utils
   gameStateUtils.js
   puzzleIdUtils.js
   saveSolvedGames.js
   timeUtils.js

   App.js - main application file
   app.json - configurations for the app and the APK
   babel.config.js - babel compiler configuration
   package.json - 'NPM' package configuration
   package-lock.json - locked versions of the package dependencies

3. Testing Framework:
   The application uses Jest alongside React Testing Library to testing.
   To run the tests correctly, please follow the steps below:

- navigate to the root directory of the sudoku-app - ".\FincalCode\sudoku-app"
- run 'npm test' in the terminal
- the tests should run and pass

