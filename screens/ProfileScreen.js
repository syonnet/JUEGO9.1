import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Card, Button, Dialog, Portal, TextInput, List } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../config/Config';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from "expo-font";

const ProfileScreen = () => {
  
  const [userData, setUserData] = useState({});
  const [editingAge, setEditingAge] = useState(false);
  const [ageInput, setAgeInput] = useState('');
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const handleNavigateToGameScreen = () => {
    navigation.navigate('GameScreen');
  };
 
 
 ///////////////////////////////////////////////
//  const currentUser = auth.currentUser;

//  const handleSignOut = () => {
//    signOut(auth)
//      .then(() => {
//       navigation.navigate('WelcomeStack');// Aquí podrías agregar la navegación a la pantalla de inicio o a la pantalla de autenticación
//     })
//     .catch((error) => {
//       // Manejar errores si ocurre algún problema al cerrar sesión
//       console.error('Error al cerrar sesión:', error.message);
//     });
// };
////////////////////////////////////////////////
 
  
  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = ref(db, '/usuarios_DMZ/' + userId);

    const fetchData = async () => {
      try {
        const snapshot = await onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData(data || {});
          setAgeInput(data?.age ? data.age.toString() : '');
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditAge = () => {
    setEditingAge(true);
  };

  const handleAgeChange = (text) => {
    setAgeInput(text);
  };

  const handleSaveAge = () => {
    const newAge = parseInt(ageInput);
    if (!isNaN(newAge)) {
      const userId = getAuth().currentUser.uid;
      update(ref(db, `usuarios_DMZ/${userId}`), { age: newAge });
      setEditingAge(false);
      setUserData({ ...userData, age: newAge });
      setVisible(true);
    }
  };

  const hideDialog = () => setVisible(false);

  const listItems = [
    { title: '📧​Correo electrónico:', value: userData.email || 'No disponible' },
    { title: '😎​Nombre de usuario:', value: userData.username || 'No disponible' },
    { title: '🎂​Edad:', value: userData.age || 'No disponible' },
  ];
  
  const [fontsLoaded] = useFonts({
    gumela: require("../assets/fonts/Gumela.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/p.png')}
        style={styles.backgroundImage}
      >
        <Card style={styles.card}>
          <Card.Content>
            <FontAwesome name="gears" size={100} color="black" style={styles.emoji} />
            <List.Section>
              {listItems.map((item, index) => (
                <List.Item
                key={index}
                titleStyle={styles.itemTitle}
                descriptionStyle={styles.userData} 
                title={item.title}
                description={item.value}
                style={styles.listItem}
              />
              ))}
            </List.Section>
            <View style={styles.editAge}>
              {editingAge ? (
                <View>
                  <Text>Cambiar Edad:</Text>
                  <TextInput
                    onChangeText={handleAgeChange}
                    value={ageInput}
                    keyboardType="numeric"
                  />
                  <Button mode="contained" onPress={handleSaveAge} style={styles.button}>
                    Guardar
                  </Button>
                </View>
              ) : (
                <Button mode="contained" onPress={handleEditAge} style={styles.button}>
                  Editar
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={handleNavigateToGameScreen}
          style={styles.button}
        >
          Jugar Juego
        {/* </Button>
        <Button mode="contained" onPress={handleSignOut} style={styles.logoutButton}>
        Cerrar sesión */}
      </Button>
      </ImageBackground>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Edad Cambiada</Dialog.Title>
          <Dialog.Content>
            <Text>{`Nueva edad: ${ageInput}`}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userData: {
    fontSize: 18,
    fontFamily:'gumela',

  },
  emoji: {
    alignSelf: 'center',
    marginBottom: -5,
  },

  card: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  editAge: {
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#fc6e6e',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#333',
    fontSize:19,
    alignItems: 'center',
    
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
