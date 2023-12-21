import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import { SocialIcon } from 'react-native-elements';
import { Linking } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    let soundObject = null;

    const loadAndPlaySound = async () => {
      try {
        soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../assets/B.mp3'));
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error al reproducir el sonido', error);
      }
    };

    const stopSound = async () => {
      if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        soundObject = null;
      }
    };

    const focusListener = navigation.addListener('focus', () => {
      loadAndPlaySound();
    });

    const blurListener = navigation.addListener('blur', () => {
      stopSound();
    });

    return () => {
      focusListener();
      blurListener();
      stopSound();
    };
  }, []);


  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/');
  };

  const [youtubeCounter, setYoutubeCounter] = useState(0);

  const handleYoutubePress = () => {
    setYoutubeCounter(youtubeCounter + 1);

    if (youtubeCounter >= 5) {
      Alert.alert('¡Somos RSS Desing!', '¡Tienes el huevo de Pascua! 🥚🐇');
      setYoutubeCounter(0);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/image/w.png')}
      style={styles.container}
    >
      <View style={styles.buttonContainer}>
        <TouchableRipple
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.buttonContent}>
            <Icon name="sign-in" size={20} color="white" />
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')}
        >
          <View style={styles.buttonContent}>
            <Icon name="user-plus" size={20} color="white" />
            <Text style={styles.buttonText}>Registrarse</Text>

          </View>
        </TouchableRipple>
        <View style={styles.socialIconsContainer}>
          <TouchableRipple onPress={handleInstagramPress}>
            <SocialIcon type="instagram" />
          </TouchableRipple>
          <TouchableRipple onPress={handleFacebookPress}>
            <SocialIcon type="facebook" />
          </TouchableRipple>
          <TouchableOpacity onPress={handleYoutubePress}>
            <SocialIcon type="youtube" />
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 199,
    alignItems: 'center',
  },
  button: {
    width: '60%',
    height: 50,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#e68a00',
  },
  registerButton: {
    backgroundColor: '#cc2e2e',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: -50,
  },
});

export default WelcomeScreen;
