import React from 'react';
import { View, Text } from 'react-native';
import Spaceship from './src/components/Spaceship';
import Ovni from './src/components/Ovni';
import { styles } from './src/styles';

let imagens, animacao, teclado, colisor, nave, criadorInimigos;
let totalImagens = 0, carregadas = 0;
let musicaAcao;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{'asd'}</Text>
      <Ovni />
      <Spaceship
        left={0}
      />
    </View>
  );
}

