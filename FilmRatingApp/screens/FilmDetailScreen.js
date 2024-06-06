import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импорт AsyncStorage
import { Animated } from 'react-native';

export default function FilmDetailScreen({ route }) {
  const { filmId } = route.params;
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];  // Инициализация значения анимации

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Получаем ID пользователя из AsyncStorage
    AsyncStorage.getItem('userId')
      .then(userId => {
        if (userId) {
          // Отправляем запрос на сервер для получения информации о фильме
          axios.get(`http://localhost:8080/films/${filmId}`)
            .then(response => {
              setFilm(response.data);
              setLoading(false);
              // Проверяем, лайкнул ли пользователь данный фильм
              setLiked(response.data.likedBy.includes(parseInt(userId)));
            })
            .catch(error => {
              console.error(error);
              setLoading(false);
            });
        }
      })
      .catch(error => {
        console.error('Error retrieving user ID:', error);
      });
  }, [filmId]);

  const handleLike = () => {
    AsyncStorage.getItem('userId')
      .then(userId => {
        if (userId) {
          // Определяем URL в зависимости от того, лайкнут фильм или нет
          const url = liked ? `http://localhost:8080/films/${filmId}/like/${userId}` : `http://localhost:8080/films/${filmId}/like/${userId}`;
          // Выполняем запрос на сервер для установки или удаления лайка
          axios({
            method: liked ? 'delete' : 'put',
            url: url,
          })
            .then(response => {
              setFilm(response.data);
              setLiked(!liked);
              showToast(liked ? 'Лайк удален.' : 'Лайк добавлен.');
            })
            .catch(error => {
              console.error('Like action error:', error);
              showToast('Ошибка при обработке лайка.');
            });
        }
      })
      .catch(error => {
        console.error('Error retrieving user ID:', error);
      });
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (!film) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Ошибка загрузки данных</Text>
      </View>
    );
  }

  return (
    <Animated.ScrollView style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{film.name}</Text>
      <Text style={styles.sectionTitle}>Описание</Text>
      <Text style={styles.description}>{film.description}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Дата выхода:</Text>
        <Text style={styles.infoText}>{film.releaseDate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Продолжительность:</Text>
        <Text style={styles.infoText}>{film.duration} минут</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Рейтинг MPA:</Text>
        <Text style={styles.infoText}>{film.mpa.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Жанры:</Text>
        <Text style={styles.infoText}>{film.genres.map(genre => genre.name).join(', ')}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Рейтинг:</Text>
        <Text style={styles.infoText}>{film.rate}</Text>
      </View>
      <View style={styles.likeButtonContainer}>
        <TouchableOpacity onPress={handleLike} style={[styles.likeButton, liked ? styles.liked : styles.notLiked]}>
          <Text style={styles.likeButtonText}>{liked ? '👎 Убрать лайк' : '👍 Лайк'}</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  likeButtonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  likeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  liked: {
    backgroundColor: '#ff6b6b',
  },
  notLiked: {
    backgroundColor: '#4caf50',
  },
  likeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
