import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import FilmList from '../components/FilmList';

export default function FilmScreen({ navigation, route }) {
  const [films, setFilms] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/films');
        setFilms(response.data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchData();
  }, [refresh]); // Повторно загружать фильмы только при изменении refresh

  const handleRefresh = useCallback(() => {
    setRefresh(!refresh); // Изменяем значение refresh для обновления списка фильмов
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // При фокусе на экране FilmScreen вызываем функцию обновления
      handleRefresh();
    });

    return unsubscribe;
  }, [navigation, handleRefresh]);

  // Функция для навигации на страницу с жанрами
  const goToGenres = () => {
    navigation.navigate('Genres');
  };

  // Функция для навигации на страницу с рейтингами
  const goToMpas = () => {
    navigation.navigate('MpaScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Жанры" onPress={goToGenres} />
        <Button title="Рейтинги" onPress={goToMpas} />
      </View>
      <FilmList films={films} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});
