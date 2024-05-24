import 'react-native-gesture-handler';
import './App.css'
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/screens/HomeScreen';


const App = () => {
  return (
    
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollContent: {
    flexGrow: 1, // permite que o conteúdo da ScrollView cresça para preencher o espaço disponível
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'absolute', // Posicione o ícone absolutamente
    top: 10, // Ajuste a posição do topo conforme necessário
    right: 10, // Ajuste a posição da direita conforme necessário
  },
});

export default App;
