import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Pwin = ({ matchedCards, board, setMatchedCards, setScore, setSelectedCards, setTimeLeft }) => {
  const didPlayerWin = () => {
    if (matchedCards && board) {
      return matchedCards.length === board.length;
    }
    return false;
  };

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
    setTimeLeft(60000);
  };

  return (
    <View>
      <Text style={styles.title}>
        {didPlayerWin() ? "¡Felicidades! 🎉" : "Guerrero Z"}
      </Text>
      {didPlayerWin() && (
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Jugar Otra Vez</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginVertical: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Pwin;