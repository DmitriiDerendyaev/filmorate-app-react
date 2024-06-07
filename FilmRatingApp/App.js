import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FilmScreen from './screens/FilmScreen';
import GenreScreen from './screens/GenreScreen';
import MpaScreen from './screens/MpaScreen';
import FilmDetailScreen from './screens/FilmDetailScreen';
import CreateFilmScreen from './screens/CreateFilmScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen} 
      options={{ title: 'Register' }} 
    />
    <Stack.Screen 
      name="Films" 
      component={FilmScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Genres" 
      component={GenreScreen} 
      options={{ title: 'Genres' }} 
    />
    <Stack.Screen 
      name="FilmDetail" 
      component={FilmDetailScreen} 
      options={{ title: 'Film Detail' }} 
    />
        <Stack.Screen 
      name="MpaScreen" 
      component={MpaScreen} 
      options={{ title: 'MpaScreen' }} 
    />
  </Stack.Navigator>
);


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainStack} />
        <Tab.Screen name="CreateFilm" component={CreateFilmScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
