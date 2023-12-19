import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../config/Config';

export default function Score({ score }) {
  const style = score > 10 ? styles.highScore : styles.score;
  const [userData, setUserData] = useState({});
  const gameTimeRef = useRef(0);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const userRef = ref(db, `/usuarios_DMZ/${userId}`);

    const fetchData = async () => {
      try {
        const snapshot = await onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data || {});
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();

    // Verificar si el juego ha alcanzado los 60 segundos para guardar el puntaje
    const interval = setInterval(() => {
      gameTimeRef.current += 1;
      if (gameTimeRef.current === 60 && userId) {
        set(ref(db, `/usuarios_DMZ/${userId}/puntaje`), score)
          .then(() => {
            console.log('Puntaje guardado en la base de datos exitosamente.');
          })
          .catch((error) => {
            console.error('Error al guardar el puntaje:', error);
          });
        clearInterval(interval); // Detener el intervalo después de guardar el puntaje
      }
    }, 1000); // Incrementar gameTimeRef.current cada segundo

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [score]);

  return (
    <View>
      <Text>{`Jugador: ${userData.username ? userData.username : "No disponible"}`}</Text>
      <Text style={style}>
        Score: {score}
      </Text>
    </View>
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
    color: "#010402"
  }
});
