import React from "react";
import { ScrollView, SafeAreaView, Text } from "react-native";
import stylesInstrScreen from "../styles/stylesInstrScreen";

function InstructionsScreen() {
  return (
    <SafeAreaView
      style={[
        stylesInstrScreen.centeredView,
        stylesInstrScreen.backgroundColor,
        stylesInstrScreen.scrollView,
      ]}
    >
      <ScrollView>
        <Text style={stylesInstrScreen.text}>
          Hello there!
          {"\n \n"}
          Are you ready to jump into the Sudoku puzzle world?
          {"\n \n"}
          The classic logic-based game with the "simple" goal to fill a 9x9 grid
          as fast as possible.
        </Text>

        <Text style={stylesInstrScreen.headerText}>How to Play Sudoku?</Text>
        <Text style={stylesInstrScreen.text}>
          The goal to fill a 9x9 grid, so that each: {"\n"}
          row + column + 3x3 section {"\n"}
          contain all of the digits between 1 and 9.
          {"\n \n"}
          Start with the given numbers and logically fill in the missing ones.
          {"\n \n"}
          And did I mention that each number can appear only once in each row,
          column, and section?
        </Text>

        <Text style={stylesInstrScreen.headerText}>Game Functionality</Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>
            - New Puzzle Generation:
          </Text>
          {"\n \n"}
          Choose from four different levels: Easy, Medium, Hard or Extreme.
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>- Resume Puzzle:</Text>
          {"\n \n"}
          The resume button will be enabled if you have started a game. There
          you can resume the game from where you left off.
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>- Time Tracking:</Text>
          {"\n \n"}
          Time tracking feature helps with tracking your puzzle-solving time and
          progression in solving different puzzle levels.
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>
            - Reset Grid Button:
          </Text>
          {"\n \n"}
          Start over with the current puzzle, correct mistakes or try different
          strategies from scratch.
          {"\n \n"}
          Don't forget, time is still ticking!
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>- Step Back Button:</Text>
          {"\n \n"}
          Undo your last move, making it simple to correct errors without
          restarting the puzzle.
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>- Validate Grid:</Text>
          {"\n \n"}
          Check progression at any time to see if you're on the right track,
          highlighting wrong numbers in red.
        </Text>
        <Text style={stylesInstrScreen.text}>
          <Text style={stylesInstrScreen.bulletPoint}>- Solve Puzzle:</Text>
          {"\n \n"}
          Get the solution for the current puzzle, perfect for learning or when
          you're truly stuck. But remember, it's not as fun as solving it... ;)
          {"\n \n"}
          and the game will be marked as solved.
        </Text>

        <Text style={stylesInstrScreen.headerText}>History Screen</Text>
        <Text style={stylesInstrScreen.text}>
          View a list of all solved puzzles - showing puzzle level, game number,
          completion time and date.
          {"\n \n"}
          Tap on an item to see the solved puzzle grid. Each entry is
          interactive, allowing you to review the completed puzzle grid and your
          solving time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InstructionsScreen;
