
import React, { useEffect } from 'react';

import { View, Text } from 'react-native';

export function NotificationsScreen({ navigation }) {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <View>
      <Text>Testando requisição HTTPS</Text>
    </View>
  );
  }