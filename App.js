import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spaceship from './src/components/Spaceship';
import Ovni from './src/components/Ovni';
import AxisPad from 'react-native-axis-pad';
import { styles } from './src/styles';

console.disableYellowBox = true;
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ovniHeight = 32;
const ovniWidth = 64;
const spaceshipY = 100;
const spaceshipWidth = 48;
const spaceshipHeight = 36;
let ovniTimerId;

export default function App() {
  const [ovniX, setOvniX] = useState(Math.random() * screenWidth);
  const [ovniY, setOvniY] = useState(screenHeight);
  const [left, setLeft] = useState(screenWidth / 2);
  const [cursorX, setCursorX] = useState(0);
  const maxLeft = Dimensions.get('window').width - 36;
  var intervalID, checkCollisionInterval

  function resetOvni() {
    setOvniX(Math.random() * (screenWidth - 36));
    setOvniY(screenHeight);
  }

  useEffect(() => {
    if (cursorX != 0) {
      intervalID = setInterval(() => {
        setLeft(left => left > maxLeft ? maxLeft : left < 0 ? 0 : left += (5 * cursorX));
      }, 10);
    }
    return () => clearInterval(intervalID);

  }, [cursorX]);

  //comportamento do ovni
  useEffect(() => {
    let colidiu = false
    if ((ovniY + 10) < (spaceshipY + spaceshipWidth) && (ovniY + 10) > spaceshipY) {
      // Checa colisão com o lado esquerdo
      if (left > (ovniX) && left < (ovniX + ovniWidth)) {
        colidiu = true;
      }
      // Checa colisão com o lado direito
      else if ((left + spaceshipWidth) > (ovniX) && (left + spaceshipWidth) < (ovniX + ovniWidth)) {
        colidiu = true;
      }
      if (colidiu) {
        console.log('Game Over');
        resetOvni();
        setOvniY(screenHeight);
        clearInterval(ovniTimerId);
        clearInterval(intervalID);
        clearInterval(checkCollisionInterval);
      }
    }
    if (ovniY > -ovniHeight) {
      ovniTimerId = setInterval(() => {
        setOvniY(ovniY => ovniY - 15)
      }, 3 * 10);
      return () => {
        clearInterval(ovniTimerId);
      }
    }
    else {
      console.log('asd');
      resetOvni()
    }
  }, [ovniY]);

  useEffect(() => {
    checkCollisionInterval = setInterval(() => {
    }, 100)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ top: 20, color: 'white', paddingLeft: 20 }}>{left}</Text>
      <Ovni
        ovniX={ovniX}
        ovniY={ovniY}
      />
      <AxisPad
        wrapperStyle={{ position: 'absolute', bottom: 0, left: (screenWidth / 2 - 40) }}
        resetOnRelease={true}
        autoCenter={false}
        lockY
        size={80}
        handlerSize={40}
        onValue={({ x, y }) => {
          setCursorX(x);
        }} />

      <Spaceship
        left={left}
        bottom={spaceshipY}
      />
    </View>
  );
}

