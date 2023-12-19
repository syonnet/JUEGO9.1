import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Score({ score }) {
  
  const style = score > 10 ? styles.highScore : styles.score;

  return (
    <Text style={style}>
      Score: {score}
    </Text>
  );
}

const styles = StyleSheet.create({
  score: {
    fontSize: 32,
    fontWeight: "900",    
    color: "white"
  },
  highScore: {
    fontSize: 32,
    fontWeight: "900",
    color: "#50C878"  
  }
});
