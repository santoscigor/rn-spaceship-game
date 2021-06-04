import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spaceship from './src/components/Spaceship';
import AxisPad from 'react-native-axis-pad';
import { styles } from './src/styles';

console.disableYellowBox = true;

export default function App() {
  const [left, setLeft] = useState(40);
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

  return (
    <View style={styles.container}>
      <Text>{left}</Text>
      <AxisPad
        wrapperStyle={{ position: 'absolute', bottom: 40 }}
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

