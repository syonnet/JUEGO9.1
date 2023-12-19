import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Image, Alert } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  function login() {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Acceso correcto');
        navigation.navigate('MainTab');
        setSnackbarVisible(true);
        setUsername('');
        setPassword('');
        console.log(userCredential.user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/invalid-credential':
            errorMessage = 'Credenciales inválidas. Por favor, verifica tus datos.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
            break;
          default:
            errorMessage = 'Error al iniciar sesión. Verifica tus credenciales e intenta nuevamente.';
            break;
        }

        Alert.alert('Error', errorMessage);
      });
  }

  return (
    <ImageBackground
      source={require('../assets/image/l.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        </View>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <TextInput
            label="Nombre de Usuario"
            mode="flat"
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
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={login}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              icon={() => <Icon name="arrow-right" size={20} color="#121212" />}
            >
              Iniciar Sesión
            </Button>
          </View>
        </ScrollView>
        <View style={styles.snackbarContainer}>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
            style={styles.snackbar}
          >
            ¡Inicio de sesión exitoso!
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
    padding: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    paddingTop: 300,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  formContainer: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFEB3B',
    fontWeight: 'bold',
    fontSize: 36,
    fontStyle: 'italic',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#FFEB3B',
    borderRadius: 10,
  },
  buttonLabel: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 18,
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

export default LoginScreen;