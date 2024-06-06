import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import FilmList from '../components/FilmList';

export default function FilmScreen() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/films')
      .then(response => {
        setFilms(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
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
});
