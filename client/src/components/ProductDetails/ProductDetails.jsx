import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const ProductDetails = ({ route }) => {
  
  const { item } = route.params;

  const [favorite, setFavorite] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const getFavoriteStatus = async () => {
        let favorites = await AsyncStorage.getItem('favorites');
        favorites = favorites ? JSON.parse(favorites) : [];
        const isFavorite = favorites.some(fav => fav.id === item.id);
        setFavorite(isFavorite);
      };
  
      getFavoriteStatus();
    }, [item.id])
  );
  const toggleFavorite = async () => {
    let favorites = await AsyncStorage.getItem('favorites');
    favorites = favorites ? JSON.parse(favorites) : [];
  
    if (favorite) {
      const newFavorites = favorites.filter(fav => fav.id !== item.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setMessage('Item removido dos favoritos');
      setMessageColor('rgba(0, 0, 0, 0.7)');
    } else {
      const newFavorites = [...favorites, item];
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setMessage('Item adicionado aos favoritos');
      setMessageColor('rgba(0, 128, 0, 0.7)');
    }
    
    setFavorite(!favorite);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);


  };

  const findAttribute = (id) => {
    if (item && item.attributes) {
      const attribute = item.attributes.find((attr) => attr.id === id);
      return attribute ? attribute.value_name : "Não disponível";
    }
    return "Não disponível";
  };

  function formatPriceWithSuperscript(price) {
    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

    // Separar os valores inteiros e os centavos
    const [reais, centavos] = formattedPrice.replace('R$', '').trim().split(',');

    return {
      reais,
      centavos,
    };
  }

  const { reais, centavos } = formatPriceWithSuperscript(item.price);

  const attributeLabels = {
    BRAND: "Marca",
    LINE: "Linha",
    MODEL: "Modelo",
    COLOR: "Cor",
    PROCESSOR_MODEL: "Processador",
  };
//{item.attributes.find(attr => attr.id === 'BRAND').value_name}

  //ERA ASSIM - ESTA MAIS ENTENDIVEL
  //   <View style={styles.container}>
  //   <Text>{item.title}</Text>
  //   <Image source={{uri: item.thumbnail.replace(/\w\.jpg/gi, "W.jpg")}} style={styles.image}/>
  //   <View style={styles.description}>
  //       <Text>Marca: <span style={styles.value_description}> {findAttribute('BRAND')} </span> </Text>
  //       <Text>Linha: <span style={styles.value_description}> {findAttribute('LINE')} </span> </Text>
  //       <Text>Modelo: <span style={styles.value_description}> {findAttribute('MODEL')} </span> </Text>
  //       <Text>Cor: <span style={styles.value_description}> {findAttribute('COLOR')} </span> </Text>
  //       <Text>Processador: <span style={styles.value_description}> {findAttribute('PROCESSOR_MODEL')} </span> </Text>
  //   </View>
  // </View>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
    <View>

      <Icon
        name={favorite ? 'heart' : 'heart-o'}
        type='font-awesome'
        color={favorite ? 'red' : 'grey'}
        onPress={toggleFavorite}
        containerStyle={{ position: 'absolute', top: 0, right: 5 }}
      />
      <Image
        source={{ uri: item.thumbnail.replace(/\w\.jpg/gi, "W.jpg") }}
        style={styles.image}
        />

    </View>
    {showMessage && (
        <View style={[styles.messageContainer, { backgroundColor: messageColor }]}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
      <Text style={styles.price}>
        <Text style={styles.priceSymbol}>R$</Text> {reais},
        <Text style={styles.priceCents}>{centavos}</Text>
      </Text>
      <Text style={styles.labelDescription}>Características do produto</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewDescription}>
          {Object.keys(attributeLabels).map((attrId, index) => {
            const attributeValue = findAttribute(attrId);
            const itemStyle =
              index % 2 === 0 ? styles.itemEven : styles.itemOdd;

            return (
              <View key={attrId} style={[styles.item, itemStyle]}>
                <Text style={styles.description}>
                  {attributeLabels[attrId]}:{" "}
                  <Text style={styles.valueDescription}>
                    {attributeValue}
                  </Text>
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    bottom: 0,
    width: '90%',
    padding: 15,
    backgroundColor: '#039703',
    alignItems: 'center',
    zIndex: 1000,
    borderRadius: 10,
    alignSelf: 'center',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignSelf: "center",
  },
  price: {
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500",
  },
  priceSymbol: {
    fontSize: 17,
    verticalAlign: 'super',
  },
  priceCents: {
    fontSize: 17,
    verticalAlign: 'super',
  },
  labelDescription: {
    fontSize: 20,
    borderTopColor: '#cdcdcd',
    borderBottomColor: '#cdcdcd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 20,
    paddingTop: 20,
    fontWeight: "300",
  },
  viewDescription: {
    flex: 1,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
  },
  valueDescription: {
    fontWeight: "bold",
    fontSize: 18,
  },
  item: {
    padding: 10,
    marginBottom: 10, // Adiciona um espaçamento entre os itens
  },
  itemEven: {
    backgroundColor: '#ececec',
  },
  itemOdd: {
    backgroundColor: '#add8e6',
  },
});

export default ProductDetails;
