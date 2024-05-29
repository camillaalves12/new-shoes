import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import FavoritesScreen from "../screens/FavoritesScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://10.0.0.138:3000/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        data.results.forEach((product) => {
          //console.log(product.attributes);
        });
      })
      .catch((error) => console.error("Erro:", error.message));
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produtos"
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Favoritos")}>
              <Icon
                name="heart"
                type="font-awesome"
                color="#272525"
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ProductCard
                  item={item}
                  onPress={() =>
                    props.navigation.navigate("Detalhes", { item: item })
                  }
                />
              )}
              numColumns={2}
            />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Detalhes" component={ProductDetails} />
      <Stack.Screen name="Favoritos" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    // backgroundColor: '#94B0DA',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});
