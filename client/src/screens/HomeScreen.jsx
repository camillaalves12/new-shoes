import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, FlatList, Image, Text } from 'react-native';

import ProductCard from '../components/ProductCard/ProductCard';
import ProductDetails from '../components/ProductDetails/ProductDetails';

import { createStackNavigator } from '@react-navigation/stack';
import { NotificationsScreen } from './NotificationsScreen';

// import Constants from 'expo-constants'

const Stack = createStackNavigator();

export function HomeScreen() {

  // const { manifest } = Constants;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.100.171:3000/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.results)
        data.results.forEach(product => {
          //console.log(product.attributes);
        });
      })
      .catch(error => console.error('Erro:', error.message));
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Stack.Navigator>
      <Stack.Screen name="Produtos" >
        {props => (
          <View style={styles.container}>
            <FlatList
              data={products}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <ProductCard {...props} item={item} />}
              numColumns={2}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Detalhes" component={ProductDetails} />
    </Stack.Navigator>
  </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
},
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    // backgroundColor: '#94B0DA',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center'
  }
});



