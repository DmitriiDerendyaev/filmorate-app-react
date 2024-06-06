import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FilmList = ({ films }) => {
  const navigation = useNavigation();

  const handlePress = (filmId) => {
    navigation.navigate('FilmDetail', { filmId });
  };

  return (
    <FlatList
      data={films}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Release Date: {item.releaseDate}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>MPA Rating: {item.mpa.name}</Text>
            <Text>Genres: {item.genres.map(genre => genre.name).join(', ')}</Text>
            <Text>Rate: {item.rate}</Text>
          </View>
        </TouchableOpacity>
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
