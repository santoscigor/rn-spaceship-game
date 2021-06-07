import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createAppContainer } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Jogo from './src/components/Jogo/Jogo.js';
import Home from './src/components/Home';
import GameOver from './src/components/GameOver';
import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Game" component={Jogo} />
        <Stack.Screen name="GameOver" component={GameOver} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;