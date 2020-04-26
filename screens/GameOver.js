import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import GameScreen from "./GameScreen";
import NumberContainer from "../components/NumberContainer";

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <Text>This game is over. It took</Text>
      <NumberContainer>{props.guessRounds}</NumberContainer>
      <Text>rounds.</Text>
      <Text>Number was {props.userNumber}</Text>
      <Button title="New Game" onPress={props.startNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default GameOver;
