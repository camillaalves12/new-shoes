import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}


const ProductCard = ({ item }) => {
  return (
      <View style={styles.card}>
        <Image source={{uri: item.thumbnail.replace(/\w\.jpg/gi, "W.jpg")}} style={styles.image}/>
        <View style={styles.details}>
          <Text style={styles.descricao} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
          <Text style={styles.preco}>{formatPrice(item.price)}</Text>
          <Text style={styles.quantity}>Quantidade disponível: {item.available_quantity}</Text>
          <TouchableOpacity style={styles.btn}  > 
          <Text style={styles.btnText}>
            Adicionar ao carrinho
          </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginLeft: 5
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  quantity: {
    fontSize: 10,
    marginTop: 10,
    color: '#888',
  },
  btn: {
    fontSize: 10,
    padding: 8,
    borderRadius: 24,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: '#fff',
  }
});

export default ProductCard;
