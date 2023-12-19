import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const Timer = ({ onTimeOut, setBoard, setSelectedCards, setMatchedCards, setScore }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timer);
        onTimeOut(); // Llamar a la función onTimeOut proporcionada por el GameScreen
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeOut]);

  return (
    <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 10 }}>
      Timer: {timeLeft}
    </Text>
  );
};

export default Timer;