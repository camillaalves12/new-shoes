import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductCard from '../components/ProductCard/ProductCard'


const FavoritesScreen = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      setFavorites(favorites ? JSON.parse(favorites) : []);
    };

    getFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id ? item.id.toString() : ''}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
  })


  export default FavoritesScreen;