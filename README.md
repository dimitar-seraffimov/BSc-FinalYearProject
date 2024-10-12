# Final Year Project

Hello there!

I have uploaded the Android application on the Expo Dev server and this is the link to download the APK:

https://expo.dev/artifacts/eas/2Nr9pawmLtQdvR3KYBiPUK.apk

In this file I am describing how to run:

1. the final application on a Virtual Device, both Android and IOS.
2. each of the Proof of Concept Programs.

---

1. Running the Final Application on a Virtual Device Emulator

The process of emulating the final application of this project, requires navigation in the command line
to the '.\FincalCode\sudoku-app' directory. The process is very is similar to running the \PoC - Program2.

How to run the 'sudoku-app':

1. Install Android Studio emulator, link to the official website - https://developer.android.com/studio
2. Create a Virtual Device inside the emulator. For the development of the application, the /Pixel 6 API 34/ is used.
3. Start the Virtudal Device.
4. Ensure that you are inside the ".\FincalCode\sudoku-app" folder.
5. In the terminal, write the following command => npm install
6. After successful instalation, run the application writing the command => npm start
7. After the application bundles successfuly, follow the instructions in the CLI. Follow the commands:

"
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android -> follow this instruction, as the /Pixel 6 API 34/ is Android based
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands "

8. The GUI should bundle in the Android Studio emulator.

---

Another option for emulating, is to scan the provided QR code in the console line.

Important to note is, that in this way, the 'Expo' mobile testing application must be pre-downloaded on the phone.
This won't require downloading a Virtual Emulator. 

This is the only way to run the application on IOS too.

Important to know is that the WiFi you try to establish the connection needs to be private, not public.

---

2. Running each of the Proof of Concept programs

The first and third PoC programs are written in Python and they do not need anything specific to run them.

How to run the \PoC - N-Queens puzzle, specifically the n_queens_solver.py program:

1. Ensure Python 3.x is installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the directory containing the script.
4. Run the script using the command python n_queens_solver.py

The process of running the \PoC - Program2 is a little bit more complicated.
It is possible that I have missed some small steps.
This program only shows the GUI, there is no added functionality behind it.

How to run the \PoC - Program2:

1. Install Android Studio emulator, link to the official website - https://developer.android.com/studio
2. Create a Virtual Device inside the emulator. For the development of the application, the /Pixel 6 API 34/ is used.
3. Start the Virtudal Device.
4. Ensure that you are inside the ".\PoC - Program2\sudoku-app\" folder.
5. In the terminal, write the following command => npm install
6. After successful instalation, run the application writing the command => npm start
7. After the application bundles successfuly, follow the instructions in the CLI. Follow the commands:

"
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android -> follow this instruction, as the /Pixel 6 API 34/ is an Android
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu

› Press ? │ show all commands "

8. The GUI should bundle in the Android Studio emulator.

How to run the \PoC - Program3, specifically "backtracking_algo.py" program:

1. Ensure Python 3.x is installed on the system.
2. Open a terminal or command prompt.
3. Navigate to the directory containing the script.
4. Run the script using the command => python backtracking_algo.py
