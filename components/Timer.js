import React, { useState, useEffect } from "react";
import { Text, Alert } from "react-native";

const Timer = ({ onTimeOut }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(timer);
        onTimeOut();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeOut]);

  return <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 10 }}>Timer: {timeLeft}</Text>;
};

export default Timer;
