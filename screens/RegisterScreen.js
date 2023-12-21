import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set } from "firebase/database";
import Avatar from '../components/Avatar';


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [uid, setUid] = useState('')

  const registro = () => {
    switch (true) {
      case !email || !username || !password || !age:
        showMessage('Por favor, completa todos los campos.');
        break;
      case !hasAtSymbol(email):
        showMessage('Ingresa un correo electrónico válido.');
        break;
      case password.length < 6:
        showMessage('La contraseña debe tener al menos 6 caracteres.');
        break;
      default:
        createUser();
    }
  };

  const showMessage = (message) => {
    Alert.alert('Error', message);
  };

  const hasAtSymbol = (email) => {
    return email.includes('@');
  };
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Usuario registrado con éxito
        const user = userCredential.user;
        const uid = user.uid; // Obtener la UID generada por Auth

        // UID para guardar los datos del usuario en la base de datos
        writeUserData(uid, email, password);

        navigation.navigate('Login');
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            showMessage('Este correo ya está registrado. ¡Prueba con otro!');
            break;
          case 'auth/invalid-email':
            showMessage('El formato del correo electrónico es inválido.');
            break;
          case 'auth/weak-password':
            showMessage('La contraseña es débil. ¡Intenta con una más fuerte!');
            break;
          default:
            showMessage('Hubo un error al registrar. Inténtalo nuevamente más tarde.');
        }
      });
  };

  function writeUserData(uid, correog, password) {
    const usersRef = ref(db, 'usuarios_DMZ/' + uid); // Utiliza la UID como la ruta en la base de datos

    set(usersRef, {
      email: email,
      username: username,
      password: password,
      age: age,
    }).then(() => {
      console.log('Usuario registrado exitosamente');
    }).catch((error) => {
      console.error('Error al registrar el usuario:', error);
    });
  }

  const guardar = () => {
    registro()
    writeUserData(uid, email, password, age)
  }

  return (
    <ImageBackground
      source={require('../assets/image/r.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Avatar />
          <TextInput
            label="Correo Electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            style={styles.input}
            left={<TextInput.Icon icon="mail" />}
          />
          <TextInput
            label="Nombre de Usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
          />
          <TextInput
            label="Edad"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
            style={styles.input}
            left={<TextInput.Icon icon="calendar" />}
          />
          {/* <View style={styles.buttonContainer}> */}
            <Button
              mode="contained"
              onPress={registro}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              icon={() => <Icon name="arrow-right" size={30} color="#121212" />}
            >
              Registrarse
            </Button>
          {/* </View> */}
        </ScrollView>
        <View style={styles.snackbarContainer}>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
            style={styles.snackbar}
          >
            ¡Registro exitoso!
          </Snackbar>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'rgba(64, 64, 64, 0.26)',
    paddingTop: 250,
  },

  input: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  button: {
    backgroundColor: '#c70000',
    borderRadius: 25,
    paddingVertical: 12,
    elevation: 3,
  },
  buttonLabel: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 20,
  },
  snackbarContainer: {
    position: 'absolute',
    bottom: 20,
    width: '108%',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    alignItems: 'center',
  },

});

export default RegisterScreen;
