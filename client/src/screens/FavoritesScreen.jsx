import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "../components/ProductCard/ProductCard";
import { useFocusEffect } from "@react-navigation/native";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const isMounted = useRef(true);

  const updateFavorites = useCallback(async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null && isMounted.current) {
        setFavorites(JSON.parse(favorites));
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    updateFavorites();
  }, [updateFavorites]);

  useFocusEffect(
    useCallback(() => {
      updateFavorites();
    }, [updateFavorites])
  );

  const renderItem = ({ item }) => {
    const handlePress = () => {
      if (item) {
        navigation.navigate("Detalhes", { item });
      }
    };

    return item ? <ProductCard item={item} onPress={handlePress} /> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default FavoritesScreen;
