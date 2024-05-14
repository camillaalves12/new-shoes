import React from "react";
import { View, Text, Image, StyleSheet, StatusBar, ScrollView } from "react-native";

const ProductDetails = ({ route }) => {
  const { item } = route.params;

  const findAttribute = (id) => {
    const attribute = item.attributes.find((attr) => attr.id === id);
    return attribute ? attribute.value_name : "Não disponível";
  };

   function formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }

  const attributeLabels = {
    BRAND: "Marca",
    LINE: "Linha",
    MODEL: "Modelo",
    COLOR: "Cor",
    PROCESSOR_MODEL: "Processador",
    RAM: "RAM",
    STORAGE: "Armazen"

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
      <Image
        source={{ uri: item.thumbnail.replace(/\w\.jpg/gi, "W.jpg") }}
        style={styles.image}
      />
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
                  <Text style={styles.value_description}>
                    {attributeValue}
                  </Text>
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </View>
  );
  
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title:{
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  image: {
    width: 400,
    height: 400,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    alignSelf: "center",
  },
  price: {
    fontSize: 26,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500"
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
    fontWeight: "300"
  },
  viewDescription: {
    flex: 1,
    marginTop: 10
  },
  description:{
    fontSize: 18
  },
  value_description: {
    fontWeight: "bold",
    fontSize: 18
  },
  item: {
    padding: 10,
    marginBottom: 10,  // Adiciona um espaçamento entre os itens
  },
  itemEven: {
    backgroundColor: '#ececec',
  },
  itemOdd: {
    backgroundColor: '#add8e6',
  },
});

export default ProductDetails;