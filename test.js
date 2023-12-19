import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/Config';

export default function ProfileScreen() {
  const [imagen, setImagen] = useState('');

  const pickImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (source === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      setImagen(result.assets[0].uri);
    }
  };

  const subir = async () => {
    try {
      if (!imagen) {
        console.log('No se ha seleccionado ninguna imagen.');
        return;
      }

      const nombreImagen = `perfil_${Date.now()}.jpg`;
      const storageRef = ref(storage, `profiles/${nombreImagen}`);
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      console.log('La imagen se subió con éxito');
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);
      setImagen('');
    } catch (error) {
      console.log('Error al subir la imagen:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Foto de Perfil</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => pickImage('camera')} style={styles.button}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage('gallery')} style={styles.button}>
          <Text style={styles.buttonText}>Elegir de Galería</Text>
        </TouchableOpacity>
      </View>
      {imagen ? <Image source={{ uri: imagen }} style={styles.imagePreview} /> : null}
      <Button title='Subir' onPress={subir} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginVertical: 20,
    resizeMode: 'cover',
  },
});
