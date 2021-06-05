import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spaceship from './src/components/Spaceship';
import Ovni from './src/components/Ovni';
import { styles } from './src/styles';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ovniHeight = 32;
let gameTimerId;

export default function App() {
  const [ovniX, setOvniX] = useState(Math.random() * screenWidth);
  const [ovniY, setOvniY] = useState(screenHeight);

  useEffect(() => {
    if(ovniY > -ovniHeight){
      gameTimerId = setInterval(() => {
        setOvniY(ovniY => ovniY - 15)
      }, 3 * 10)
      return () => {
        clearInterval(gameTimerId);
      }
    } else {
      setOvniX(Math.random() * screenWidth);
      setOvniY(screenHeight);
    }
  }, [ovniY])

  return (
    <View style={styles.container}>
      <Ovni 
        ovniX={ovniX}
        ovniY={ovniY}
      />
      <Spaceship
        left={175}
      />
    </View>
  );
}

