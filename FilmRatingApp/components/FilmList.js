import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FilmList = ({ films }) => {
  return (
    <FlatList
      data={films}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>Release Date: {item.releaseDate}</Text>
          <Text>Duration: {item.duration} minutes</Text>
          <Text>MPA Rating: {item.mpa.name}</Text>
          <Text>Genres: {item.genres.map(genre => genre.name).join(', ')}</Text>
          <Text>Rate: {item.rate}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilmList;
