import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, FlatList, Image, Text } from 'react-native';

import ProductCard from '../components/ProductCard/ProductCard';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export function HomeScreen() {


  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.results)
        data.results.forEach(product => {
          console.log(product.attributes);
        });
      })
      .catch(error => console.error('Erro:', error));
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductCard item={item} />}
            numColumns={2}
          />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center'
  },
  scrollContent: {
    flexGrow: 1,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});



