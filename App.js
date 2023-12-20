import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigation/Navigation'; // Asegúrate de que la ruta sea correcta
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GameScreen from './screens/GameScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import ScoresScreen from './screens/ScoresScreen';
import { loadFonts } from './components/fonts';



const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadApp() {
            await loadFonts();
            setFontsLoaded(true);
        }

        loadApp();
    }, []);

    if (!fontsLoaded) {
        return <View><Text>Cargando fuentes...</Text></View>;
    }


  return (
      //<NavigationContainer>
      <SafeAreaProvider>
        <PaperProvider >
          <AppNavigator />
          {/* <GameScreen/> */}
          {/* <ScoresScreen /> */}
        </PaperProvider>
      </SafeAreaProvider>
     //</NavigationContainer>
  );
};

export default App;
