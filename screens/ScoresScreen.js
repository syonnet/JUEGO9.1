import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/Config';

export default function ScoresScreen() {
  const [userData, setUserData] = useState({});

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
  }, []);

  return (
    <View style={styles.container}>
      <Text>{`Jugador: ${userData.username ? userData.username : "No disponible"}`}</Text>
      <Text>Puntaje: {userData.puntaje || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
