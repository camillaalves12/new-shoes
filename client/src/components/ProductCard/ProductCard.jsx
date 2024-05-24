import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import defaultImage from '../../../assets/defaultImage.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function formatPriceWithSuperscript(price) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  // Separar os valores inteiros e os centavos
  const [reais, centavos] = formattedPrice.replace('R$', '').trim().split(',');

  return `<span style="font-size: 0.75em; vertical-align: super;">R$</span> ${reais},<span style="font-size: 0.75em; vertical-align: super;">${centavos}</span>`;
}

const ProductCard = ({ item, onPress }) => {

  // const [favorite, setFavorite] = useState(false);

  // useEffect(() => {
  //   const getFavoriteStatus = async () => {
  //     const favorites = await AsyncStorage.getItem('favorites');
  //     if (favorites) {
  //       setFavorite(JSON.parse(favorites).includes(item.id));
  //     }
  //   };
  //   getFavoriteStatus();
  // }, [item.id]);


  return (
    <TouchableOpacity onPress={() => item && onPress()}>
      <View style={styles.card}>
      <Image source={{uri: item.thumbnail ? item.thumbnail.replace(/\w\.jpg/gi, "W.jpg") : defaultImage}} style={styles.image}/>
        <View style={styles.details}>
          <Text style={styles.descricao} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
          <Text style={styles.preco}>{formatPrice(item.price)}</Text>
          <Text style={styles.quantity}>Quantidade disponível: {item.available_quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    width: windowWidth / 2 - 20, // subtraímos 20 para levar em conta o espaçamento
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: "#fff"
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignSelf: 'center'
  },
  details: {
    padding: 10,
  },
  descricao: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  quantity: {
    fontSize: 10,
    marginTop: 10,
    color: '#888',
  }
});

export default ProductCard;
