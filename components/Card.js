import React from "react";
import { StyleSheet, Pressable,Image } from "react-native";

const Card = ({ onPress, isTurnedOver, children }) => {
  return (
    <Pressable
      style={isTurnedOver ? styles.cardUp : styles.cardDown}
      onPress={onPress}
      disabled={isTurnedOver}
    >
      {isTurnedOver ? (
        <Image source={children} style={styles.image} />
      ) : (
        <Image source={require('../assets/image/e.png')} style={styles.image} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    borderColor: "#050300",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(127, 0, 255, 0.84)",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 10,
    borderColor: "#a61111cc",
    borderRadius: 25,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
  image: {
    width: 70,
    height: 90,
    resizeMode: 'contain',
  },
});

export default Card;
