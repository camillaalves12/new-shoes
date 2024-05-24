import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, FlatList, TouchableOpacity,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard/ProductCard';
import { useFocusEffect } from '@react-navigation/native';


const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const isMounted = useRef(false);

  const fetchProducts = async () => {
    const response = await fetch(`http://192.168.101.189:3000/products`);
    const data = await response.json();
    return data.results;
  };

  const updateFavorites = async () => {
    const favoriteIds = JSON.parse(await AsyncStorage.getItem('favorites'));
    const allProducts = await fetchProducts();
    const favorites = allProducts.filter(product => favoriteIds.includes(product.id));
    if (isMounted.current) {
      setFavorites(favorites);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    updateFavorites();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateFavorites();
    }, [])
  );

  const renderItem = ({ item }) => {
    const handlePress = () => {
      if (item) {
        navigation.navigate('Detalhes', { item });
      }
    };

    return item ? <ProductCard item={item} onPress={handlePress} /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  }
});

export default FavoritesScreen;