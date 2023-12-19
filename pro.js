import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../config/Config';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [editingAge, setEditingAge] = useState(false);
  const [ageInput, setAgeInput] = useState('');

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
      Alert.alert('Edad Cambiada', `Nueva edad: ${newAge}`);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Text>{`Correo electrónico: ${userData.email ? userData.email : 'No disponible'}`}</Text>
        <Text>{`Nombre de usuario: ${userData.username ? userData.username : 'No disponible'}`}</Text>
        <Text>{`Edad: ${userData.age || 'No disponible'}`}</Text>
      </View>
      <View>
        {editingAge ? (
          <View>
            <Text>Cambiar Edad:</Text>
            <TextInput
              onChangeText={handleAgeChange}
              value={ageInput}
              keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSaveAge} />
          </View>
        ) : (
          <Button title="Editar Perfil" onPress={handleEditAge} />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
