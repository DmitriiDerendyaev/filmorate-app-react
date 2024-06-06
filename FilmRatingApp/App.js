import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FilmScreen from './screens/FilmScreen';
import GenreScreen from './screens/GenreScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Films" component={FilmScreen} />
        <Stack.Screen name="Genres" component={GenreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
