import React from 'react';
import { View, Text } from 'react-native';
import Spaceship from './src/components/Spaceship';
import { styles } from './src/styles';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>{'asd'}</Text>
      <Spaceship
        left={0}
      />
    </View>
  );
}

