import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Spaceship from './src/components/Spaceship';
import Bullet from './src/components/Bullet';
import Ovni from './src/components/Ovni';
import AxisPad from 'react-native-axis-pad';
import { styles } from './src/styles';

console.disableYellowBox = true;
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const ovniHeight = 32;
const ovniWidth = 64;
const spaceshipY = 100;
const spaceshipWidth = 64;
const spaceshipHeight = 48;
const bulletWidth = 10;
const bulletHeight = 35;
const maxLeft = screenWidth - spaceshipWidth;
let ovniTimerId;

export default function App() {
  const [ovniX, setOvniX] = useState(Math.random() * (screenWidth - ovniWidth));
  const [ovniY, setOvniY] = useState(screenHeight);
  const [spaceshipX, setSpaceshipX] = useState(screenWidth / 2);
  const [bulletX, setBulletX] = useState((screenWidth / 2) + (bulletWidth + spaceshipWidth) / 4);
  const [bulletY, setBulletY] = useState(spaceshipY + spaceshipHeight);
  const [cursorX, setCursorX] = useState(0);
  const [points, setPoints] = useState(0);
  var intervalID, bulletTimerId

  function resetOvni() {
    setOvniX(Math.random() * (screenWidth - ovniWidth));
    setOvniY(screenHeight);
  }

  function resetBullet() {
    setBulletX(spaceshipX + (bulletWidth + spaceshipWidth) / 4)
    setBulletY(spaceshipY + spaceshipHeight)
  }

  function collision(obj1X, obj1Y, obj1Width, obj1Height, obj2X, obj2Y, obj2Width, obj2Height) {
    if ((obj1Y < obj2Y) || (obj1Y > obj2Y + obj2Height))
      return false;
    if (((obj1X + obj1Width) < obj2X) || (obj1X > (obj2X + obj2Width)))
      return false
    return true
  }

  useEffect(() => {
    if (cursorX != 0) {
      intervalID = setInterval(() => {
        setSpaceshipX(spaceshipX => spaceshipX > maxLeft ? maxLeft : spaceshipX < 0 ? 0 : spaceshipX += (5 * cursorX));
      }, 10);
    }
    return () => clearInterval(intervalID);

  }, [cursorX]);

  //comportamento do ovni
  useEffect(() => {
    let ovniCollision = collision(spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight,
      ovniX, ovniY, ovniWidth, ovniHeight)
    let bulletCollision = collision(bulletX, bulletY, bulletWidth, bulletHeight,
      ovniX, ovniY, ovniWidth, ovniHeight)
    if (ovniCollision) {
      console.log('Game Over');
      resetOvni();
      setPoints(0)
    }
    if (bulletCollision) {
      setPoints(points => points + 1)
      resetOvni();
      resetBullet();
    }
    if (ovniY > -ovniHeight) {
      ovniTimerId = setInterval(() => { setOvniY(ovniY => ovniY - 15) }, 3 * 10);
    }
    else {
      resetOvni()
    }
    return () => {
      clearInterval(ovniTimerId);
      clearInterval(intervalID);
      clearInterval(bulletTimerId);
    }
  }, [ovniY]);

  useEffect(() => {
    bulletTimerId = setInterval(() => {
      if (bulletY >= screenHeight) {
        setBulletY(spaceshipY);
        setBulletX(spaceshipX + ((bulletWidth + spaceshipWidth) / 4));
      } else {
        setBulletY(bulletY => bulletY + 30)
      }
    }, 3 * 10);
    return () => clearInterval(bulletTimerId);
  }, [bulletY])

  return (
    <View style={styles.container}>
      <Text style={{ top: 20, color: 'white', paddingLeft: 20 }}>{points}</Text>
      <Ovni
        ovniX={ovniX}
        ovniY={ovniY}
      />
      <AxisPad
        wrapperStyle={{ position: 'absolute', bottom: 0, spaceshipX: (screenWidth / 2 - 40) }}
        resetOnRelease={true}
        autoCenter={false}
        lockY
        size={80}
        handlerSize={40}
        onValue={({ x, y }) => {
          setCursorX(x);
        }} />

      <Spaceship
        left={spaceshipX}
        bottom={spaceshipY}
      />
      <Bullet
        left={bulletX}
        bottom={bulletY}
        width={bulletWidth}
        height={bulletHeight}
      />
    </View>
  );
}