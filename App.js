import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spaceship from './src/components/Spaceship';
import Ovni from './src/components/Ovni';
import { styles } from './src/styles';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
let ovniTimerId;

export default function App() {
  const [ovniX, setOvniX] = useState(0);

  useEffect(() => {
    if (ovniX <= 300) {
      ovniTimerId = setInterval(() => {
        setOvniX(ovniX => ovniX + 100)
      }, 2 * 150)
    } else if (ovniX > 100) {
      ovniTimerId = setInterval(() => {
        setOvniX(ovniX => ovniX - 300)
      }, 2 * 150)
    }
    return () => {
      clearInterval(ovniTimerId);
    }
  }, [ovniX])

  return (
    <View style={styles.container}>
      <Ovni 
        ovniX={ovniX}
      />
      <Spaceship
        left={175}
      />
    </View>
  );
}

