import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:8080/users/login', {
      login,
      password
    })
    .then(response => {
      if (response.data && response.data.id !== undefined) {
        // Успешная авторизация
        const userId = response.data.id;
        // Сохраняем ID пользователя в локальное хранилище
        AsyncStorage.setItem('userId', userId.toString())
          .then(() => {
            // Переходим на экран фильмов
            navigation.navigate('Films');
          })
          .catch(error => {
            console.error('Error saving user ID:', error);
          });
      } else {
        console.error('Invalid response data:', response.data);
      }
    })
    .catch(error => {
      console.error('Login error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  registerText: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});
