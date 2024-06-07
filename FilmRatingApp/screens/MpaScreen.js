// MpaScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import MpaItem from '../components/MpaItem';

const MpaScreen = () => {
  const [mpas, setMpas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mpa');
        setMpas(response.data);
      } catch (error) {
        console.error('Error fetching mpas:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => <MpaItem mpa={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Рейтинги:</Text>
      <FlatList
        data={mpas}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

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
  list: {
    paddingBottom: 16,
  },
});

export default MpaScreen;
