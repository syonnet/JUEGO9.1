import React, { useState } from 'react';
import { View, StyleSheet, Text,   TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/Config';
import { Card, Button, IconButton } from 'react-native-paper';

export default function Avatar() {
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
      <Card style={styles.card}>
        {imagen ? (
          <Card.Cover source={{ uri: imagen }} style={styles.imagePreview} />
        ) : null}
        {imagen ? (
          <IconButton
            icon="close"
            color="#fff"
            size={24}
            onPress={() => setImagen('')}
            style={styles.closeIcon}
          />
        ) : null}
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => pickImage('camera')}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Tomar Foto
          </Button>
          <Button
            mode="contained"
            onPress={() => pickImage('gallery')}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Elegir de Galería
          </Button>
          {imagen ? (
            <Button
              mode="contained"
              onPress={subir}
              style={styles.uploadButton}
              labelStyle={styles.buttonText}
            >
              Subir
            </Button>
          ) : null}
        </Card.Content>
      </Card>
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
  card: {
    width: '80%',
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(230, 229, 229, 0.58)',
  },
  imagePreview: {
    width: '60%',
    aspectRatio: 1,
    borderRadius: 50,
    marginVertical: 20,
    alignSelf: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    borderRadius: 50,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
  },
  uploadButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#007bff',
  },
});
