import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function FilmDetailScreen({ route }) {
  const { filmId } = route.params;
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/films/${filmId}`)
      .then(response => {
        setFilm(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [filmId]);

  if (!film) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{film.name}</Text>
      <Text>{film.description}</Text>
      <Text>Release Date: {film.releaseDate}</Text>
      <Text>Duration: {film.duration} minutes</Text>
      <Text>MPA Rating: {film.mpa.name}</Text>
      <Text>Genres: {film.genres.map(genre => genre.name).join(', ')}</Text>
      <Text>Rate: {film.rate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
