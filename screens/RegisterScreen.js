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
        const errorMessage = error.message;
        console.error(errorMessage);
        Alert.alert('Error', errorMessage);
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
          {/* <Text style={styles.title}>¡Regístrate!</Text> */}
          <TextInput
            label="Correo Electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={registro}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              icon={() => <Icon name="arrow-right" size={20} color="#121212" />}
            >
              Registrarse
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
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    paddingTop: 250,
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
    borderRadius: 35,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
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

export default RegisterScreen;
