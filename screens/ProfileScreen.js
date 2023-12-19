import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground,Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../config/Config';
import { Card, DataTable, Button, Dialog, Portal, TextInput, Title } from 'react-native-paper';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [editingAge, setEditingAge] = useState(false);
  const [ageInput, setAgeInput] = useState('');
  const [visible, setVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/p.png')}
        style={styles.backgroundImage}
      >
        <Card style={styles.card}>
          <Card.Content>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell >Correo electrónico:</DataTable.Cell>
                <DataTable.Cell>{userData.email || 'No disponible'}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell >Nombre de usuario:</DataTable.Cell>
                <DataTable.Cell>{userData.username || 'No disponible'}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell >Edad:</DataTable.Cell>
                <DataTable.Cell>{userData.age || 'No disponible'}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
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
 
  card: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop:150,

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
});

export default ProfileScreen;
