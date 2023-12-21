import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/Config';
import { Card, Button, IconButton } from 'react-native-paper';

export default function Avatar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imagen, setImagen] = useState('');
  const Golden = 'golden.ttf';
  const Gumela = 'Gumela.ttf';

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
      setModalVisible(false);
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
            onPress={() => setModalVisible(true)}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Foto de Perfil
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Seleccionar Foto</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                pickImage('camera'); // Lógica para tomar una foto
              }}
            >
              <Text style={styles.modalButtonText}>Tomar Foto</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                pickImage('gallery'); // Lógica para elegir desde la galería
              }}
            >
              <Text style={styles.modalButtonText}>Elegir de Galería</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    marginBottom: 10,
  },
  imagePreview: {
    aspectRatio: 1,
    borderRadius: 100,
    marginVertical: 10,
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  uploadButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#007bff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#007bff',
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },



});
