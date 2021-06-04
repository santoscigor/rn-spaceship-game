import React, { Component } from 'react';
import { Image,  } from 'react-native';

const Ovni = ({ovniX}) => {
    return (
        <Image
            style={{ position: 'absolute', top: 100, left: ovniX }}
            source={require('../../assets/images/ovni.png')}
        />
    );
}

export default Ovni;
