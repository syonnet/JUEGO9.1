import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Snackbar, Card, Divider } from 'react-native-paper';
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
        <Card style={styles.card}>
          <TextInput
            label="Nombre de Usuario"
            mode="outlined"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />
          <Divider style={styles.divider} />
          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
          />
          <Button
            mode="contained"
            onPress={login}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            icon={() => <Icon name="user" size={35} color="#121212" />} 
          >
            Iniciar Sesión
          </Button>
        </Card>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(195, 217, 218, 0.7)',
    elevation: 4,
  },
  input: {
    marginBottom: 20,
  },
  divider: {
    marginVertical: 10,
    backgroundColor: '#000000',
  },
  button: {
    backgroundColor: '#FFC107',
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
    width: '100%',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default LoginScreen;