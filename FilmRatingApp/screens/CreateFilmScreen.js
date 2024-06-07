// CreateFilmScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const CreateFilmScreen = ({ navigation }) => {
  const [filmName, setFilmName] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [rate, setRate] = useState('');
  const [selectedMpa, setSelectedMpa] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [mpaList, setMpaList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mpaResponse = await axios.get('http://localhost:8080/mpa');
        setMpaList(mpaResponse.data);
        
        const genreResponse = await axios.get('http://localhost:8080/genres');
        setGenreList(genreResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateFilm = async () => {
    const newFilm = {
      name: filmName,
      releaseDate: releaseDate,
      description: description,
      duration: duration,
      mpa: { id: selectedMpa },
      genres: [{ id: selectedGenre }],
    };

    try {
      const response = await axios.post('http://localhost:8080/films', newFilm);
      console.log('Film created successfully:', response.data);
      navigation.navigate('Films', { refresh: true }); // Переход на FilmScreen с параметром обновления
    } catch (error) {
      console.error('Error creating film:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Film</Text>
      <TextInput
        style={styles.input}
        placeholder="Film Name"
        value={filmName}
        onChangeText={setFilmName}
      />
      <TextInput
        style={styles.input}
        placeholder="Release Date (YYYY-MM-DD)"
        value={releaseDate}
        onChangeText={setReleaseDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={selectedMpa}
        onValueChange={(itemValue, itemIndex) => setSelectedMpa(itemValue)}
      >
        <Picker.Item label="Select MPA" value="" />
        {mpaList.map(mpa => (
          <Picker.Item key={mpa.id} label={mpa.name} value={mpa.id} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedGenre}
        onValueChange={(itemValue, itemIndex) => setSelectedGenre(itemValue)}
      >
        <Picker.Item label="Select Genre" value="" />
        {genreList.map(genre => (
          <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
        ))}
      </Picker>
      <Button title="Create Film" onPress={handleCreateFilm} />
    </View>
  );
};

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
});

export default CreateFilmScreen;
