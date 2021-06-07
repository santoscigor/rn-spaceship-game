
import React, { Component, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import style from './style.js';
import ButtonJogar from '../ButtonJogar'


const Sobre = ({ navigation }) => {
    return (
        <View style={style.container} >
            <Text style={style.textGameOver}>Game Over</Text>
            <ButtonJogar navigation={navigation}/>
        </View>
    );
}

export default Sobre