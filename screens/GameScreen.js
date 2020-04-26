import React from "react";
import { Alert, StyleSheet, View, Text, Button } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    generateRandomNumber(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = React.useState(
    generateRandomNumber(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = React.useState(0);

  const currentLow = React.useRef(1); // Same as state, just the component will not rerender on changing it's value.
  const currentHigh = React.useRef(100); // Along with this useRef also can be used to store ref to text elements.

  React.useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
      currentHigh.current = 100;
      currentLow.current = 0;
      setRounds(0);
    }
  }, [currentGuess, props.userChoice, props.onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't lie!`, "You know this is wrong", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setRounds(currentRounds => currentRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card styles={styles.buttonContainer}>
        <Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="Greater"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
