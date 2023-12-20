import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Card, ListItem, Icon } from 'react-native-elements';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/Config';
import { useFonts } from "expo-font";

export default function ScoresScreen() {
  const [userScores, setUserScores] = useState([]);

    useEffect(() => {
    const userScoresRef = ref(db, '/usuarios_DMZ');

    const fetchData = async () => {
      try {
        const snapshot = await onValue(userScoresRef, (snapshot) => {
          const users = snapshot.val();
          const usersArray = users ? Object.values(users) : [];
          setUserScores(usersArray);
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const renderUserItem = ({ item, index }) => (
    <View style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }]}>
      <Icon name="user" type="font-awesome" color="#900" />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{`Nombre: ${item.username ? item.username : "No disponible"}`}</Text>
        <Text style={styles.userScore}>{`Puntaje: ${item.puntaje || 0}`}</Text>
      </View>
    </View>
  );


const [fontsLoaded] = useFonts({
  gumela: require("../assets/fonts/Gumela.ttf"),
});

if (!fontsLoaded) {
  return null;
}
  return (
    <ImageBackground source={require('../assets/image/p.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Text style={styles.title}>Scores Z</Text>
          <View style={styles.scoresList}>
            {userScores.map((user, index) => (
              <View key={index}>
                {renderUserItem({ item: user, index: index })}
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    backgroundColor: 'rgba(255, 0, 0, 0.37)', // Rojo transparente
    borderRadius: 10,
    width: '85%',
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    color: '#fff',
    marginVertical: 20,
    fontFamily:'gumela',
    
  },
  scoresList: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#52525296',
    borderRadius:12,
  },
  userDetails: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userScore: {
    fontSize: 14,
    color: '#fe3939',
    
  },
});
