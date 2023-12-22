import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigation/Navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
      <SafeAreaProvider>
        <PaperProvider >
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
  );
};

export default App;
