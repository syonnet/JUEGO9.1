import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

const Board = ({
  board,
  selectedCards,
  matchedCards,
  handleTapCard,
}) => {
  return (
    <View style={styles.board}>
      {board.map((card, index) => {
        const isTurnedOver =
          selectedCards.includes(index) || matchedCards.includes(index);
        return (
          <Card
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={() => handleTapCard(index)}
          >
            {card}
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default Board;
