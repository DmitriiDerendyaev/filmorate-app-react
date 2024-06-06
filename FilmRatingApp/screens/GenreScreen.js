import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GenreScreen() {
  const [genres, setGenres] = useState([]);
  const [mpa, setMpa] = useState([]);

  useEffect(() => {
    axios.get('https://your-api-url.com/genres')
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('https://your-api-url.com/mpa')
      .then(response => {
        setMpa(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Genres</Text>
      <FlatList
        data={genres}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Text style={styles.heading}>MPA Ratings</Text>
      <FlatList
        data={mpa}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 24,
    marginVertical: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
