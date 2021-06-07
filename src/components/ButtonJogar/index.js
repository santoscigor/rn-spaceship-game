import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import style from './style.js';

const ButtonJogar = ({ navigation }) => {
    return (
        <View style={style.containere}>
            <TouchableOpacity style={style.buttonPlayGame} title="Jogar" onPress={() => navigation.push('Game', { 'vida': 3 })}>
                <Text styles={style.textPlay} >Jogar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ButtonJogar