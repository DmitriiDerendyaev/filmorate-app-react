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
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Дата выхода:</Text>
                <Text style={styles.detailValue}>{item.releaseDate}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Длительность:</Text>
                <Text style={styles.detailValue}>{item.duration} минут</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Рейтинг MPA:</Text>
                <Text style={styles.detailValue}>{item.mpa.name}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Жанры:</Text>
                <Text style={styles.detailValue}>{item.genres.map(genre => genre.name).join(', ')}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.detailLabel}>Рейтинг:</Text>
                <Text style={styles.detailValue}>{item.rate}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  titleContainer: {
    marginBottom: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginTop: 8,
  },
  description: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: 4,
  },
  detailValue: {
    color: '#333',
  },
});

export default FilmList;
    