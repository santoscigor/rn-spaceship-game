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
const spaceshipY = 0;
let ovniTimerId;

export default function App() {
  const [ovniX, setOvniX] = useState(Math.random() * screenWidth);
  const [ovniY, setOvniY] = useState(screenHeight);
  const [left, setLeft] = useState(screenWidth/2);
  const [cursorX, setCursorX] = useState(0);
  const maxLeft = Dimensions.get('window').width - 36;

  var intervalID
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
    if(ovniY > -ovniHeight){
      ovniTimerId = setInterval(() => {
        setOvniY(ovniY => ovniY - 15)
      }, 3 * 10);
      return () => {
        clearInterval(ovniTimerId);
      }
    } else {
      setOvniX(Math.random() * screenWidth);
      setOvniY(screenHeight);
    }
  }, [ovniY]);

  useEffect(() => {
    if(ovniY === spaceshipY){
      if( left > (ovniX + ovniWidth/2) && left < (ovniX - ovniWidth/2) ) {
        clearInterval(ovniTimerId);
        clearInterval(intervalID);
        console.log('game over');
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{top: 20, color: 'white', paddingLeft: 20}}>{left}</Text>
      <Ovni 
        ovniX={ovniX}
        ovniY={ovniY}
      />
      <AxisPad
        wrapperStyle={{ position: 'absolute', bottom: 0, left: (screenWidth/2 - 40) }}
        resetOnRelease={true}
        autoCenter={false}
        lockY
        size={80}
        handlerSize={40}
        onValue={({ x, y }) => {
          setCursorX(cursorX => x);
        }} />

      <Spaceship
        left={left}
      />
    </View>
  );
}

