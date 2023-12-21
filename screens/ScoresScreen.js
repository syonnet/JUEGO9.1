import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Icon } from 'react-native-elements';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/Config';
import { useFonts } from "expo-font";
import { Video } from "expo-av";

export default function ScoresScreen() {
  const [userScores, setUserScores] = useState([]);
  const Golden = 'golden.ttf';
  const Gumela = 'Gumela.ttf';

  useEffect(() => {
    const userScoresRef = ref(db, '/usuarios_DMZ');

    const fetchData = async () => {
      try {
        const snapshot = await onValue(userScoresRef, (snapshot) => {
          const users = snapshot.val();
          const usersArray = users ? Object.values(users) : [];
          // Ordenar los puntajes de mayor a menor
          usersArray.sort((a, b) => (a.puntaje > b.puntaje ? -1 : 1));

          // Tomamos los tres puntajes más altos
          const topThreeScores = usersArray.slice(0, 4);
          setUserScores(topThreeScores);
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
        <Text style={styles.userName}>{`Jugador: ${item.username ? item.username : "No disponible"}`}</Text>
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
    <View style={styles.container}>
      <Video
        source={require("../assets/video/bV.mp4")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        isLooping
        shouldPlay
      />
      <Card containerStyle={styles.card}>
        <Text style={{ fontFamily: 'golden-regular', fontSize: 46, textAlign: "center", color: "#fcfcfc" }}>Score Z</Text>
        <ScrollView style={styles.scrollView}>
          {userScores.slice(0, 10).map((user, index) => (
            <View key={index} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#e6e6e6' }]}>
              <Icon name="user" type="font-awesome" color="#900" />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{`Jugador: ${user.username ? user.username : "No disponible"}`}</Text>
                <Text style={styles.userScore}>{`Puntaje: ${user.puntaje || 0}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Card>
    </View>
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
    backgroundColor: 'rgba(255, 0, 0, 0.37)',
    borderRadius: 10,
    width: '85%',
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
    borderRadius: 12,
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
    color: '#3f7f24',

  },
  scrollView: {
    maxHeight: 460, 
  },
});
