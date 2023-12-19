import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScoresScreen from '../screens/ScoresScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WelcomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);
const GameStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Game" component={GameScreen} />
  </Stack.Navigator>
);


const MainTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      
      tabBarIcon: ({ color, size }) => {
        let iconName;

        // Asigna íconos según la ruta/tab seleccionada
        if (route.name === 'Profile') {
          iconName = 'person'; // Cambia 'person' al nombre del ícono que deseas para el perfil
        } else if (route.name === 'Scores') {
          iconName = 'leaderboard'; // Cambia 'leaderboard' al nombre del ícono que deseas para puntuaciones
        }

        // Retorna el componente de ícono
        return <Icon type="material" name={iconName} size={size} color={color} />;
      },
    })}
      
    
  >
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Scores" component={ScoresScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerMode: "false" }}>
        <Stack.Screen name="WelcomeStack" component={WelcomeStack} />
        <Stack.Screen name="GameStack" component={GameStack} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
