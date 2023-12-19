import React from 'react';
import AppNavigator from './navigation/Navigation'; // Asegúrate de que la ruta sea correcta
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameScreen from './screens/GameScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    // <NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider >
          <AppNavigator />
          {/* <GameScreen/> */}
          {/* <ProfileScreen /> */}
        </PaperProvider>
      </SafeAreaProvider>
    //  </NavigationContainer>
  );
};

export default App;
